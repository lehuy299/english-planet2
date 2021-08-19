import React from 'react';
import {cs, consumeContext} from "cs-react";
import {PopupMenu} from '../../common/popup-menu/popup-menu';
import {EditStudentModal} from './edit-student-modal/edit-student-modal';

export const StudentCommands = ({next}) => cs(
    consumeContext("resolve"),
    consumeContext("routing"),
    ["editStudentModal", ({resolve}, next) => EditStudentModal({
        onDone: (updatedStudent) => resolve.updateStudent(updatedStudent),
        onDeactivate: (student) => resolve.updateStudents(resolve.students.filter((s) => s.id !== student.id)),
        next,
    })],
    // ({editStudentModal, routing}) => PopupMenu({
    //     getCommands: (student) => ([
    //         {
    //             label: "Information",
    //             onClick: () => editStudentModal.show(student),
    //         },
    //         {
    //             label: "Enrollments",
    //             onClick: () => {
    //                 routing.goto(
    //                     "/enrollment", 
    //                     {query: {studentId: student.id}}
    //                 )
    //             },
    //         },
    //     ]),
    //     next,
    // })
    ({editStudentModal, routing}) => next({
        render: (student) => (
            <div className="student-commands table-row-commands">
                <button
                    onClick={() => editStudentModal.show(student)}
                >Edit</button>
                <button
                    onClick={() => routing.goto("/enrollment", {query: {studentId: student.id}})}
                >Enroll</button>
            </div>
        )
    })
);
