import React from 'react';
import {cs, consumeContext, keyed} from "cs-react";
import {rContextMenu} from '../../../common/context-menu/context-menu';
import {EditClassDateModal} from '../edit-class-date-modal/edit-class-date-modal';

export const ClassDateCommands = ({next}) => cs(
    consumeContext("cds"),
    consumeContext("routing"),
    ["editClassDateModal", ({cds}, next) => EditClassDateModal({
        onDone: cds.updateClassDate,
        onDelete: cds.deleteClassDate,
        next,
    })],
    ({editClassDateModal, routing}) => {
        return rContextMenu({
            getCommands: (classDate) => ([
                {
                    label: "Edit",
                    onClick: () => editClassDateModal.show(classDate),
                },
                {
                    label: "Attendance",
                    onClick: () => {
                        routing.goto("/attendance", {query: {classId: classDate.class_id, classDateId: classDate.id}})
                    }
                }
            ]),
            next,
        })
    }
);
