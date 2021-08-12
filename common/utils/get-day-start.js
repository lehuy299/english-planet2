const {DateTime} = require("luxon");

const quicks = {};
const getDayStart = (millis, tz) => {
    const quick = quicks[tz] = quicks[tz] || getDayStartTz(tz);
    return quick(millis);
};
exports.getDayStart = getDayStart;

const getDayStartTz = (tz) => {
    const dayStarts = [];
    return (millis) => {
        let dayStart = dayStarts.find((dayStart) => millis >= dayStart && millis - dayStart < 24*60*60*1000);
        if (dayStart == null) {
            dayStart = DateTime.fromMillis(millis, {zone: tz}).startOf("day").toMillis();
            while (millis - dayStart > 24*60*60*1000) { // Fuck luxon. Shitty lib!
                dayStart += 24*60*60*1000;
            }
            while (dayStart - millis > 24*60*60*1000) { // Fuck luxon. Shitty lib!
                dayStart -= 24*60*60*1000;
            }
            dayStarts.push(dayStart);
        }
        return dayStart;
    };
};

// const millis = 1581008400000;
// const tz = "Asia/Saigon";
// console.log(new Date(millis));
// console.log(DateTime.fromMillis(millis, {zone: tz}).toObject());
// console.log(new Intl.DateTimeFormat("en", { month: "numeric", day: "numeric", timeZone: tz }).format(new Date(millis)))
