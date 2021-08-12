import React from "react";
import {consumeContext, cs, Load2} from "cs-react";
import {cIndexedGetter} from "../../../../../common/utils/indexing";
import {replaceFind, replaceFind_f} from "../../../../../common/utils/collections";

export const StaticResolve = ({next}) => cs(
    consumeContext("apis"),
    ["classes", ({apis}, next) => Load2({
        fetch: () => apis.class.getClasses(),
        next,
    })],
    ["teachers", ({apis}, next) => Load2({
        fetch: () => apis.teacher.getTeachers(),
        next,
    })],
    ["students", ({apis}, next) => Load2({
        fetch: () => apis.student.getStudents(),
        next,
    })],
    ({classes, teachers, students}) => {
        return next({
            loading: classes.loading || teachers.loading || students.loading,

            classes: classes.value,
            updateClasses: classes.onChange,
            updateClass: (class1) => classes.onChange(replaceFind(classes.value, class1, (c) => c.id === class1.id)),
            getClass: cIndexedGetter(classes.value, "id"),

            teachers: teachers.value,
            updateTeachers: teachers.onChange,
            updateTeacher: (teacher) => teachers.onChange(replaceFind(teachers.value, teacher, (t) => t.id === teacher.id)),
            getTeacher: cIndexedGetter(teachers.value, "id"),

            students: students.value,
            updateStudents: students.onChange,
            updateStudent: (student) => students.onChange(replaceFind(students.value, student, (s) => s.id === student.id)),
            getStudent: cIndexedGetter(students.value, "id"),
        })
    }
);
