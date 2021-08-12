const {paddingLeft} = require("../../../../common/utils/strings");

const getRandomInt = (max) => {
    return Math.floor(Math.random() * max);
};
exports.getRandomInt = getRandomInt;

const randomName = () => {
    const familyNames = ["Nguyen", "Tran", "Le", "Duong", "Hoang"];
    const middleNames = ["Van", "Thi"];
    const firstNames = ["Nam", "Huy", "Thanh", "Mai", "Tuan"];

    const getName = (nameArr) => nameArr[getRandomInt(nameArr.length - 1)];

    return getName(familyNames) + " " + getName(middleNames) + " " + getName(firstNames);
};
exports.randomName = randomName;

const randomDatetime = (start, end) => {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};
exports.randomDatetime = randomDatetime;

// console.log(randomDatetime(new Date(2012, 0, 1), new Date()))

const randomPhoneNumber = () => {
    return paddingLeft(Math.ceil(Math.random() * Math.pow(10, 9)), 10);
};
exports.randomPhoneNumber = randomPhoneNumber;
