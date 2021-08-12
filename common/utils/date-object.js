const {createArray} = require("./collections");
const {paddingLeft} = require("./strings");
const JsDate = require("./js-date");
const {sort} = require("./collections");
const {keepOnly} = require("./objects");
const chain = require("./fs").chain;
const {DateTime} = require("luxon");

const getWeekDays = (date) => {
    const start = toDate(getWeekStart(date)).getTime();

    return createArray(7).map((i) => {
        const wd = new Date(start);
        wd.setDate(wd.getDate() + i);
        return Object.assign({},parseDate(wd), {dow: i,});
    });
};
exports.getWeekDays = getWeekDays;

const getMonthStart = (date) => {
    return {...date, day: 1};
};
exports.getMonthStart = getMonthStart;

const getWeekStart = (date) => {
    const d = toDate(date);

    const start = new Date(d.getTime());
    start.setDate(start.getDate() - d.getDay());
    return parseDate(start);
};
exports.getWeekStart = getWeekStart;

const getMonthEnd = (date) => ({
    ...date,
    day: getMonthLength(date),
});
exports.getMonthEnd = getMonthEnd;

const getMonthLength = (date) => {
    return chain(
        toDate({...date, day: 1}),
        (d) => JsDate.addMonth(d, 1),
        (d) => JsDate.addDate(d, -1),
        (d) => d.getDate(),
    );
};
exports.getMonthLength = getMonthLength;

const getMonthWeeks = (date) => {
    const monthStart = getMonthStart(date);

    let weeks = [];
    let index = getWeekStart(monthStart);
    for (;;) {
        const weekDays = getWeekDays(index);
        if (weekDays.find((wd) => wd.month === date.month)) {
           weeks.push(weekDays);
           index = addDate(index, 7);
        } else {
            break;
        }
    }
    return weeks;
};
exports.getMonthWeeks = getMonthWeeks;

const getMonthDays = (date) => {
    return chain(
        getMonthStart(date),
        (start) => createArray(getMonthLength(date)).map((i) => addDate(start, i))
    );
};

exports.getMonthDays = getMonthDays;

const toDate = (date) => new Date(date.year, date.month - 1, date.day || 1, 0);
exports.toDate = toDate;

const parseDate = (date, tz) => {
    if (date == null) {
        return null;
    }
    if (tz && typeof date === "number") {
        return DateTime.fromMillis(date, {zone: tz}).toObject();
    }

    date = typeof date === "number" || typeof date === "string" ? new Date(date) : date;

    return ({
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate(),
    });
};
exports.parseDate = parseDate;

const sameDate = (d1, d2) => {
    if (d1 == null && d2 == null) {
        return true;
    } else if (d1 == null || d2 == null) {
        return false;
    }

    return d1.day === d2.day &&
        d1.month === d2.month &&
        d1.year === d2.year;
};
exports.sameDate = sameDate;

const inDate = (millis, date, tz) => {
    const d = millis - toJsDate(date, tz).getTime();

    return d >= 0 && d < 24 * 60 * 60* 1000;
};

exports.inDate = inDate;

const importances = ["year", "month", "day"];
const lt = (d1, d2) => {
    for (const a of importances) {
        if (d1[a] !== d2[a]) {
            return d1[a] < d2[a];
        }
    }
    return false; // Don't accept equals
};
exports.lt = lt;
const le = (d1, d2) => {
    for (const a of importances) {
        if (d1[a] !== d2[a]) {
            return d1[a] < d2[a];
        }
    }
    return true; // Accept equals
};
exports.le = le;
const gt = (d1, d2) => {
    for (const a of importances) {
        if (d1[a] !== d2[a]) {
            return d1[a] > d2[a];
        }
    }
    return false; // Don't accept equals
};
exports.gt = gt;

const ge = (d1, d2) => {
    for (const a of importances) {
        if (d1[a] !== d2[a]) {
            return d1[a] > d2[a];
        }
    }
    return true; // Accept equals
};
exports.ge = ge;

exports.compares = {ge,gt,le,lt};

const serializeDate = (date) => {
    return `${date.year}-${paddingLeft(date.month)}-${paddingLeft(date.day)}`;
};
exports.serializeDate = serializeDate;

const serializeMonth = (date) => {
    return `${date.year}-${paddingLeft(date.month)}`;
};
exports.serializeMonth = serializeMonth;

const deserialize = (date) => parseDate(new Date(date));
exports.deserialize = deserialize;

const addDate = (date, delta) => parseDate(JsDate.addDate(toDate(date), delta));
exports.addDate = addDate;

const addMonth = (date, delta) => parseDate(JsDate.addMonth(toDate(date), delta));
exports.addMonth = addMonth;

const addYear = (date, delta) => parseDate(JsDate.addYear(toDate(date), delta));
exports.addYear = addYear;

const getMonthRange = ({year, month}) => {
    const monthStart = {year, month, day: 1};
    return ({from: monthStart, to: addMonth(monthStart, 1)});
};
exports.getMonthRange = getMonthRange;

const getDow = (date) => {
    if (date.dow) {
        return date.dow;
    }
    return toDate(date).getDay();
};
exports.getDow = getDow;


function dateDiff(d1, d2) {
    return (toDate(d1).getTime() - toDate(d2).getTime()) / (24*60*60*1000)
}
exports.dateDiff = dateDiff;

const today = (tz) => {
    return keepOnly(DateTime.fromObject({zone: tz}).toObject(), ["year", "month", "day"]);
};
exports.today = today;

const today2 = () => {
    const date = new Date();
    return {
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate(),
    };
};
exports.today2 = today2;

const getWeekRange = (date) => {
    const from = getWeekStart(date);
    return {from, to: addDate(from, 6)};
};
exports.getWeekRange = getWeekRange;

const tomorrow = (tz) => addDate(today(tz), 1);
exports.tomorrow = tomorrow;

const yesterday = (tz) => addDate(today(tz), -1);
exports.yesterday = yesterday;

const singleDateRange = (date) => ({from: date, to: addDate(date, 1)});
exports.singleDateRange = singleDateRange;

const toJsDate = (d, tz) => {
    if (!tz) {
        return new Date(d.year, d.month - 1, d.day || 1, 0, 0, 0, 0);
    }
    return DateTime.fromObject({...keepOnly(d, ["year", "month", "day"]), zone: tz}).toJSDate();
};
exports.toJsDate = toJsDate;
exports.toJsDate1 = toJsDate;


const minDate = (d1, d2) => {
    const diff = dateDiff(d1, d2);
    if (diff >= 0) {
        return d2;
    }
    return d1;
};
exports.minDate = minDate;

const getDatesInRange = ({from, to}) => {
    let ret = [];
    for (;!sameDate(from, to); from = addDate(from, 1)) {
        ret.push(from);
    }
    return ret;
};
exports.getDatesInRange = getDatesInRange;

const getDatesInRangeIncluded = ({from, to}) => {
    let ret = [];
    for (; !sameDate(from, addDate(to, 1)); from = addDate(from, 1)) {
        ret.push(from);
    }
    return ret;
};
exports.getDatesInRangeIncluded = getDatesInRangeIncluded;

const relativeDate = ({month, day}) => {
    const year = new Date().getFullYear();
    const today = today2();
    return chain(
        [-1,0,1],
        (_) => _.map((delta) => {
            const date = {
                month, day, year: year + delta,
            };
            return ({
                date,
                diff: Math.abs(dateDiff(today,date)),
            });
        }),
        (_) => sort(_, (r) => r.diff),
        (_) => _[0].date,
    );
};
exports.relativeDate = relativeDate;
