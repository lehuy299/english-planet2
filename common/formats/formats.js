const {addDate} = require("../utils/date-object");
const {parseDate} = require("../utils/date-object");
const {chain} = require("../utils/fs");
const {dateDiff, today} = require("../utils/date-object");

const {getDayStart} = require("../utils/get-day-start");
const {paddingLeft} = require("../utils/strings");
const {getDow} = require("../utils/date-object");

const formatRange = (range) => {
    if (range.from === range.to) {
        return range.to;
    } else {
        return range.from + "-" + range.to;
    }
};
exports.formatRange = formatRange;

const roundUp = (value, fraction) => {
    if (value % 1 >= fraction) {
        return Math.ceil(value);
    } else {
        return Math.floor(value);
    }
};
exports.roundUp = roundUp;
// export const formatNumber = (num) => {
//     if (num==null) {
//         return "";
//     }
//     const {big, small} = breakNumberToStrings(num);
//     return big + "." + (small || "00");
// };
const formatNumberBig = (num) => {

    if (num==null) {
        return "";
    }
    return formatBigNumber(Math.round(num));
};
exports.formatNumberBig = formatNumberBig;


// export const formatMoney = (num) => {
//     return "$" + formatNumber(num);
// };

// For vn money
const formatMoney = (num) => {

    if (num < 0) {
        return "-" + addCommas("" + Math.round(-num/1000))+"k";
    } else {
        return addCommas("" + Math.round(num/1000))+"k";
    }
};
exports.formatMoney = formatMoney;

// For vn money
const formatMoneySmall = (num) => {
    const str = "" + (Math.round(num/100) / 10);
    const indexOfDot = str.indexOf(".");
    if (indexOfDot > -1) {
        return addCommas(str.substring(0, indexOfDot)) + str.substring(indexOfDot) + "k";
    } else {
        return addCommas(str) + ".0" + "k";
    }
};
exports.formatMoneySmall = formatMoneySmall;

const formatBigNumber = (num) => {
    return (num < 0 ?"-":"") + addCommas("" + Math.round(Math.abs(num)));
};
exports.formatBigNumber = formatBigNumber;

const addCommas = (num) => {
    let ret = "";
    for (let i = 0; i < num.length; i++) {
        if (i > 0 && i % 3 === 0) {
            ret = "," + ret;
        }
        ret = num[num.length - 1 - i] + ret;
    }
    return ret;
};


function formatHour(hour) {
    hour = Math.round(hour * 60)/60;
    const hours = Math.floor(hour);
    return paddingLeft(hours === 0 ? "12" : hours > 12 ? hours - 12 : hours) + ":" + paddingLeft(Math.round((hour-hours) * 60)) +
        (hour >= 12 ? "pm" : "am");
}
exports.formatHour = formatHour;

function formatHour24(hour) {
    hour = Math.round(hour * 60)/60;
    const hours = Math.floor(hour);
    return paddingLeft(hours) + ":" + paddingLeft(Math.round((hour-hours) * 60));
}
exports.formatHour24 = formatHour24;

function formatHourRange(r) {
    return r == null ? "N/A" : formatHour(r.from) + " - " + formatHour(r.to);
}
exports.formatHourRange = formatHourRange;

function formatHourShort(hour) {
    const hours = Math.floor(hour);
    return (hours === 0 ? "12" : hours > 12 ? hours - 12 : hours) +
        (hour >= 12 ? "pm" : "am");
}
exports.formatHourShort = formatHourShort;


function formatTimeShort(millis) {
    const date = new Date(millis);
    return `${paddingLeft(date.getHours())}:${paddingLeft(date.getMinutes())}`;
}
exports.formatTimeShort = formatTimeShort;

function formatHourByMillis(millis, tz) {
    if (millis == null) {
        return null;
    }
    return formatHour((millis - getDayStart(millis, tz)) / (60*60*1000));
}
exports.formatHourByMillis = formatHourByMillis;

function formatHourByMillis24(millis, tz) {
    if (millis == null) {
        return null;
    }
    return formatHour24((millis - getDayStart(millis, tz)) / (60*60*1000));
}
exports.formatHourByMillis24 = formatHourByMillis24;

function formatMinutesDuration(minutes) {
    const hours = Math.floor(minutes / 60);
    return (paddingLeft(hours)) + ":" + paddingLeft(Math.round((minutes-hours*60)));
}
exports.formatMinutesDuration = formatMinutesDuration;

function translateToMins(duration, m="'", h="h") {

    const formatAbs = ((duration) => {
        const hours = Math.floor(duration / 60 / 60 / 1000);
        if (hours === 0) {
            return quickPlural(Math.floor((duration) / 60 / 1000), m);
        } else {
            const mod = duration - hours * 60 * 60 * 1000;
            return (
                hours === 0 ? (
                    ""
                ) : (
                    quickPlural(hours, h) + " "
                )
            ) + quickPlural(Math.floor(mod / 60 / 1000), m);
        }
    });

    if (duration < 0) {
        return "-" + formatAbs(-duration);
    } else {
        return formatAbs(duration);
    }
}
exports.translateToMins = translateToMins;

const quickPlural = (count, noun) => {
    if (noun.length === 1) {
        return `${count}${noun}`;
    }

    if (count === 1) {
        return `${count} ${noun}`;
    }
    return `${count} ${noun}s`;
};


const formatDate = (date) => {
    return `${weekDayLabels[getDow(date)]}, ${date.day} ${monthShortLabels[date.month - 1]} ${date.year}`;
};
exports.formatDate = formatDate;

const formatWeekDate = (date) => {
    return `${weekDayLabels[getDow(date)]}, ${date.day}`;
};
exports.formatWeekDate = formatWeekDate;

const formatDateShort = (date) => {
    return `${paddingLeft(date.day, 2)}/${paddingLeft(date.month, 2)}/${date.year}`;
};
exports.formatDateShort = formatDateShort;

const formatTimeStampShort = (millis) => {
    return `${formatDateShort(parseDate(millis))} ${formatTimeShort(millis)}`;
};
exports.formatTimeStampShort = formatTimeStampShort;

const formatTimeStampMini = (millis, tz) => {
    return `${formatDateMini(parseDate(millis, tz))} ${formatTimeShort(millis)}`;
};
exports.formatTimeStampMini = formatTimeStampMini;

const formatMonthShort = (date) => {
    return `${paddingLeft(date.month, 2)}/${date.year}`;
};
exports.formatMonthShort = formatMonthShort;

// const formatDateShort = (date) => {
//     return `${date.day} ${monthShortLabels[date.month - 1]} ${date.year}`;
// };
// exports.formatDateShort = formatDateShort;

// const formatDateMini = (date) => {
//     return `${date.day} ${monthShortLabels[date.month - 1]}`;
// };
// exports.formatDateMini = formatDateMini;

const formatDateMini = (date) => {
    return `${date.day}/${date.month}`;
};
exports.formatDateMini = formatDateMini;

const formatDateRange = (dateRange) => `${formatDateShort(dateRange.from)} - ${formatDateShort(addDate(dateRange.to, -1))}`;
exports.formatDateRange = formatDateRange;

const monthShortLabels = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul",
    "Aug", "Sep", "Oct", "Nov", "Dec"
];
exports.monthShortLabels = monthShortLabels;

const weekDayLabels = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
];
exports.weekDayLabels = weekDayLabels;

const fullName = ({nick_name, last_name}) => `${nick_name} ${last_name}`;
exports.fullName = fullName;

const capitalize = (str) => str.split(" ").map(capitalize1).join(" ");
exports.capitalize = capitalize;

const capitalize1 = (s) => s[0].toUpperCase() + s.substring(1);
exports.capitalize1 = capitalize1;

const relDate = (date, tz) => chain(
    dateDiff(date, today(tz)),
    (diff) =>
        diff === 0 ? "(Hôm nay)" :
            diff === 1 ? "(Ngày mai)" :
                diff === -1 ? "(Hôm qua)" :
                    diff > 1 ? `(${diff} ngày nữa)` :
                        `(${-diff} ngày trc)`
);
exports.relDate = relDate;
