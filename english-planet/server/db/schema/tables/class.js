module.exports = {
    name: "class",
    fields: {
        id: "uuid pk",
        name: "*",
        room: "varchar(10)",
        fee: "decimal(10,2)",
        teacher_id: "uuid fk:teacher.id",
        days_of_week: "varchar(15)",
        date_start: "date",
        date_end: "date",
        time: "decimal(10,2)",
        class_dates_generated: "boolean",
        inactive: "boolean",
    },
};
