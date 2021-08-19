const {flatten1} = require('../../../../../../common/utils/collections');
const {getDatesInRangeIncluded, getDow, le, ge} = require('../../../../../../common/utils/date-object');

const hasClassDate = (class1, date) => {
    const dows = class1.days_of_week?.split(",").map((d) => Number(d)).sort();
    if (!dows?.length || !class1.date_end || !class1.date_start) {
        return false;
    }

    return le(date, class1.date_end)
        && ge(date, class1.date_start)
        && dows.includes(getDow(date));
};
exports.hasClassDate = hasClassDate;

const generateClassDatesForADate = ({date, classes, isAuto}) => {
    const getEachClass = (class1) => {
        if (hasClassDate(class1, date)) {
            return {
                // id: JSON.stringify(date) + class1.id + Date.now(),
                class_id: class1.id,
                room: class1.room,
                teacher_id: class1.teacher_id,
                date,
                time: class1.time || 7,
                auto_generated: isAuto,
            };
        }
    };

    return classes.map((c) => getEachClass(c)).filter(v => v);
};
exports.generateClassDatesForADate = generateClassDatesForADate;

const generateClassDatesForDates = ({dateRange, classes, isAuto}) => {
    const dates = getDatesInRangeIncluded(dateRange);
    return flatten1(dates.map((date) => generateClassDatesForADate({date, classes, isAuto})));
};
exports.generateClassDatesForDates = generateClassDatesForDates;
