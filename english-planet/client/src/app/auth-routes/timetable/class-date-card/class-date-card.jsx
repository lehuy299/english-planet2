import React from "react";
import {formatHour} from "../../../../../../../common/formats/formats";
// import {EditClassDateModal} from "../edit-class-date-modal/edit-class-date-modal";
import {cs, consumeContext} from "cs-react";
import "./class-date-card.scss";
import {ClassDateCommands} from "./class-date-commands";

export const ClassDateCard = ({next}) => cs(
    consumeContext("cds"),
    consumeContext("resolve"),
    // ["editClassDateModal", ({cds}, next) => EditClassDateModal({
    //     onDone: cds.updateClassDate,
    //     onDelete: cds.deleteClassDate,
    //     next,
    // })],
    ["classDateCommands", (_, next) => ClassDateCommands({next})],
    ({editClassDateModal, resolve, classDateCommands}) => {
        return next({
            render: (classDate) => ({
                render: () => {
                    const class1 = resolve.getClass(classDate.class_id);
                    const teacher = resolve.getTeacher(classDate.teacher_id);
                    return (
                        <div className="class-date-card-4h3">
                            <div className="line">
                                <div className="hour">{formatHour(classDate.time)}</div>
                                <div className="room">at {classDate.room}</div>
                            </div>
                            <div className="line">
                                {/* <div className="teacher-name">
                                    {resolve.getTeacher(c.teacher_id || class1.teacher_id).name}
                                </div> */}
                                <div className="class-name">{class1.name}</div>
                            </div>
                            <div className="line">
                                <div className="teacher">{teacher.name}</div>
                            </div>
                        </div>
                    )
                },
                date: classDate.date,
                time: classDate.time,
                // onClick: () => editClassDateModal.show(classDate),
                onContextMenu: (e) => classDateCommands.show(e, classDate),
            })
        })
    }
);

