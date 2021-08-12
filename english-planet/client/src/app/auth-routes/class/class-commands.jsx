import React from 'react';
import {cs, consumeContext} from "cs-react";
import {PopupMenu} from '../../common/popup-menu/popup-menu';
import {EditClassModal} from './edit-class-modal/edit-class-modal';
import {replaceFind} from '../../../../../../common/utils/collections';

export const ClassCommands = ({next}) => cs(
    consumeContext("resolve"),
    consumeContext("routing"),
    ["editClassModal", ({resolve}, next) => EditClassModal({
        onDone: (updatedClass) => resolve.updateClass(updatedClass),
        onDeactivate: (class0) => resolve.updateClasses(resolve.classes.filter((c) => c.id !== class0.id)),
        next,
    })],
    ({editClassModal, routing}) => PopupMenu({
        getCommands: (class0) => ([
            {
                label: "Information",
                onClick: () => editClassModal.show(class0),
            },
            {
                label: "Enrollments",
                onClick: () => {
                    routing.goto(
                        "/enrollment",
                        {query: {classId: class0.id}}
                    )
                },
            },
        ]),
        next,
    })
);
