function truncateDate(date) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}
exports.truncateDate = truncateDate;

function truncateMonth(date) {
    return new Date(date.getFullYear(), date.getMonth());
}
exports.truncateMonth = truncateMonth;

function truncateHour(date) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours());
}
exports.truncateHour = truncateHour;

const toHour = (date) => {
    date = new Date(date);
    const truncate = truncateDate(date);
    return (date.getTime() - truncate.getTime()) / (60*60*1000);
};
exports.toHour = toHour;

const addMonth = (date, delta) => {
    date = new Date(date);

    date.setMonth(date.getMonth() + delta);
    return date;
};
exports.addMonth = addMonth;

const addYear = (date, delta) => {
    date = new Date(date);

    date.setFullYear(date.getFullYear() + delta);
    return date;
};
exports.addYear = addYear;

const addDate = (date, delta) => {
    date = new Date(date);

    date.setDate(date.getDate() + delta);
    return date;
};
exports.addDate = addDate;

const addHours = (date, delta) => {
    date = new Date(date);

    date.setHours(date.getHours() + delta);
    return date;
};
exports.addHours = addHours;

const addMinutes = (date, delta) => {
    date = new Date(date);

    date.setMinutes(date.getMinutes() + delta);
    return date;
};
exports.addMinutes = addMinutes;

const addSeconds = (date, delta) => {
    date = new Date(date);

    date.setSeconds(date.getSeconds() + delta);
    return date;
};
exports.addSeconds = addSeconds;

const sameDate = (d1, d2) => {
    if (typeof d2 === "string") {
        d2 = new Date(d2);
    }
    return d1.getTime() === d2.getTime();
};
exports.sameDate = sameDate;
