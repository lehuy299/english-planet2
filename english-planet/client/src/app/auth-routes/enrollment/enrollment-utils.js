const {getDatesInRangeIncluded} = require("../../../../../../common/utils/date-object");
const {hasClassDate} = require("../timetable/class-date-generator");

const getClassDates = ({class1, enrollment}) => {
    const dateStart = enrollment.date_start || class1.date_start;
    const dateEnd = enrollment.date_end || class1.date_end;
    if (!dateStart || !dateEnd) {
        return 0;
    }
    return getDatesInRangeIncluded({from: dateStart, to: dateEnd}).filter((d) => hasClassDate(class1, d));
};

module.exports = {
    getClassDates,
}
