import React from "react";
import {cs, State, consumeContext} from "cs-react"
import {ModalService} from "../../../common/modal/modal-service";
import "./add-teacher-modal.scss";
import {rTeacherForm} from "../edit-teacher-modal/edit-teacher-modal";

export const AddTeacherModal = ({onDone, next: rootNext}) => cs(
    ["modal", ({}, next) => ModalService({
        render: ({resolve}) => ({
            title: "Add Teacher",
            width: 500,
            content: next({
                resolve,
            }),
        }),
        next: rootNext,
    })],
    ["teacher", (_, next) => State({next})],
    ["saving", (_, next) => State({next})],
    consumeContext("apis"),
    ({modal, teacher, apis, saving}) => (
        <div className="add-teacher-modal-2rg">
            <div className="modal-body">
                {rTeacherForm({teacher})}
            </div>
            <div className="footer">
                <button onClick={modal.resolve}>Cancel</button>
                <button
                    className="primary"
                    disabled={saving.value}
                    onClick={async () => {
                        saving.onChange(true)
                        const newTeacher = await apis.teacher.upsertTeacher(teacher.value);
                        onDone(newTeacher);
                        saving.onChange(false)
                        modal.resolve();
                    }}
                >Save</button>
            </div>
        </div>
    )
);
