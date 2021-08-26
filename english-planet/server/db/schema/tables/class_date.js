module.exports = {
    name: "class_date",
    fields: {
        id: "uuid pk",
        class_id: "* uuid fk:class.id",
        teacher_id: "* uuid fk:teacher.id",
        room: "varchar(10)",
        date: "* date",
        time: "* decimal(10,2)",
        day_of_week: "int",
        fee: "decimal(10,2)",
        auto_generated: "boolean",
        performance: "json", // {student_id: {absent, comment},}
        // note: "text",
        // inactive: "boolean",
    },
};
