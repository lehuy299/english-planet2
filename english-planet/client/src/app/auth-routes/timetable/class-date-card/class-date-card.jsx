import React from "react";
import {formatHour} from "../../../../../../../common/formats/formats";
import {EditClassDateModal} from "../edit-class-date-modal/edit-class-date-modal";
import {cs, consumeContext} from "cs-react";
import "./class-date-card.scss";

export const ClassDateCard = ({next}) => cs(
    consumeContext("cds"),
    consumeContext("resolve"),
    ["editClassDateModal", ({cds}, next) => EditClassDateModal({
        onDone: cds.updateClassDate,
        onDelete: cds.deleteClassDate,
        next,
    })],
    ({editClassDateModal, resolve}) => {
        return next({
            render: (classDate) => ({
                render: () => {
                    const class1 = resolve.getClass(classDate.class_id);
                    return (
                        <div className="class-date-card-4h3">
                            <div className="line">
                                <div className="hour">{formatHour(classDate.time)}</div>
                                <div className="room">Room {classDate.room}</div>
                            </div>
                            <div className="line">
                                {/* <div className="teacher-name">
                                    {resolve.getTeacher(c.teacher_id || class1.teacher_id).name}
                                </div> */}
                                <div className="class-name">{class1.name}</div>
                            </div>
                        </div>
                    )
                },
                date: classDate.date,
                onClick: () => editClassDateModal.show(classDate),
                onContextMenu: () => {console.log("context menu")},
            })
        })
    }
);

