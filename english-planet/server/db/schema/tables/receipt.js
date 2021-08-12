module.exports = {
    name: "receipt",
    fields: {
        id: "uuid pk",
        number: "* int",
        // student_id: "* uuid fk:student.id",
        enrollment_id: "* uuid fk:enrollment.id",
        time: "* timestamp",
        discount: "json", // {type: "amount", "percent", value: 10}
        amount: "* decimal(10,2)",
    },
};
