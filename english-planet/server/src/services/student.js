const {Student} = require("../models/student");
const {Class} = require("../models/class");
const {Enrollment} = require("../models/enrollment");
const {Receipt} = require("../models/receipt");
const {flatten1, sum} = require("../../../../common/utils/collections");
const {omit} = require("../../../../common/utils/objects");
const {ClassDate} = require("../models/class-date");
const {serializeDate, getDow} = require("../../../../common/utils/date-object");

module.exports = [
    {
        createStudent: async ({params, body} = {}) => {
            return await Student.create(body);
        },
    },
    {
        deleteStudent: async ({params, body} = {}) => {

        },
    },
    {
        upsertStudent: async ({params, body} = {}) => {
            const student = omit(body, ["class_ids"]);
            if (!student.id) {
                return await Student.create(student);
            } else {
                return await Student.update(student);
            }
        },
    },
    {
        getStudent: async ({params, body} = {}) => {
            return await Student.findOne({id: params.id});
        },
    },
    {
        getStudents: async ({params, body} = {}) => {
            const students = await Student.find({inactive: false});
            const enrollments = await Enrollment.getEnrollmentsByStudentIds(students.map((s) => s.id));
            return students.map((s) => ({...s, class_ids: enrollments.filter((e) => e.student_id === s.id).map((e) => e.class_id)}));
        },
    },
    {
        getEnrollmentsByStudentId: async ({params, body} = {}) => {
            return await Enrollment.getEnrollmentsByStudentIds([params.id]);
        },
    },
    {
        upsertEnrollments: async ({params, body: updatedEnrollments} = {}) => {
            const currentEnrollments = await Enrollment.getEnrollmentsByStudentIds([params.id]);
            let newEnrollments = [];

            for (const erm of updatedEnrollments) {
                if (!erm.id) {
                    newEnrollments.push(await Enrollment.create(erm));
                } else {
                    newEnrollments.push(await Enrollment.update(erm));
                }
            }

            for (const ce of currentEnrollments) {
                if (!updatedEnrollments.find((e) => e.id === ce.id)) {
                    await Enrollment.destroy(ce.id)
                }
            }

            return newEnrollments;
        },
    },
    {
        getStudentsHavingUnfinishedPayment: async () => {
            const students = await Student.find({inactive: false});

            const getStudentPaymentReport = async (student) => {
                const enrollments = await Enrollment.getEnrollmentsByStudentIds([student.id]);

                const getEnrollmentPaymentStatus = async (enrollment) => {
                    const class1 = await Class.findOne({id: enrollment.class_id});

                    const startDate = enrollment.date_start || class1.date_start;
                    const endDate = enrollment.date_end || class1.date_end;

                    // notice: date_start, date_end, days_of_week
                    const classDates = await ClassDate.getClassDatesInDateRange({
                        dateRange: {from: serializeDate(startDate), to: serializeDate(endDate)},
                        classId: class1.id
                    }).then((clds) => clds.filter((cld) => !enrollment.days_of_week || enrollment.days_of_week.includes(getDow(cld.date))));

                    const receipts = await Receipt.find({enrollment_id: enrollment.id});

                    const totalFee = (enrollment.fee ?? class1.fee) * classDates.length;
                    const paidAmount = !receipts?.length ? 0 : sum(receipts.map((r) => r.amount));
                    const left = totalFee - paidAmount;

                    return {
                        enrollment_id: enrollment.id,
                        class_id: class1.id,
                        status: totalFee === 0 ? "no-fee" : paidAmount === 0 ? "not-paid" : (left <= 0 ? "fully-paid" : "partly-paid"),
                        left,
                    }
                };

                let ret = [];
                for (const erm of enrollments) {
                    ret.push(await getEnrollmentPaymentStatus(erm))
                }
                return ret;
            };

            let ret = [];
            for (const student of students) {
                const report = await getStudentPaymentReport(student);
                const unfinisheds = report.filter((r) => !["fully-paid", "no-fee"].includes(r.status));
                if (unfinisheds.length > 0) {
                    unfinisheds.forEach((u) => ret.push({student_id: student.id, ...u}));
                }
            }
            return ret;
        }
    }
];

