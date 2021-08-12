module.exports = {
    name: "class_date",
    fields: {
        id: "uuid pk",
        class_id: "* uuid fk:class.id",
        room: "varchar(10)",
        date: "* date",
        time: "* decimal(10,2)",
        fee: "decimal(10,2)",
        auto_generated: "boolean",
        absent_student_ids: "json",
        // note: "text",
        // inactive: "boolean",
    },
};
