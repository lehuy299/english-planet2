import React from 'react';
import {cs, consumeContext} from "cs-react";
import {PopupMenu} from '../../common/popup-menu/popup-menu';
//import {EnrollmentModal} from './enrollment-modal/enrollment-modal';
import {EditTeacherModal} from './edit-teacher-modal/edit-teacher-modal';
import {replaceFind} from '../../../../../../common/utils/collections';

export const TeacherCommands = ({next}) => cs(
    consumeContext("resolve"),
    ["editTeacherModal", ({resolve}, next) => EditTeacherModal({
        onDone: (updatedTeacher) => resolve.updateTeacher(updatedTeacher),
        onDeactivate: (teacher) => resolve.updateTeachers(resolve.teachers.filter((t) => t.id !== teacher.id)),
        next,
    })],
    ({editTeacherModal, }) => PopupMenu({
        getCommands: (teacher) => ([
            {
                label: "Information",
                onClick: () => editTeacherModal.show(teacher),
            },
        ]),
        next,
    })
);
