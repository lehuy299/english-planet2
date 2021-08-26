module.exports = {
    name: "enrollment",
    fields: {
        id: "uuid pk",
        student_id: "* uuid fk:student.id",
        class_id: "* uuid fk:class.id",
        fee: "decimal(10,2)",
        date_start: "date",
        date_end: "date",
        days_of_week: "varchar(15)",
        // inactive: "boolean",
    },
};
