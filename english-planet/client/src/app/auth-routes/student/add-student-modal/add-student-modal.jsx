import React from "react";
import {cs, State, consumeContext} from "cs-react"
import {ModalService} from "../../../common/modal/modal-service";
import "./add-student-modal.scss";
import {rStudentForm} from "../edit-student-modal/edit-student-modal";

export const AddStudentModal = ({onDone, next: rootNext}) => cs(
    ["modal", ({}, next) => ModalService({
        render: ({resolve}) => ({
            title: "Add Student",
            width: 500,
            content: next({
                resolve,
            }),
        }),
        next: rootNext,
    })],
    ["student", (_, next) => State({next})],
    ["saving", (_, next) => State({next})],
    consumeContext("apis"),
    ({modal, student, apis, saving}) => (
        <div className="add-student-modal-2rg">
            <div className="modal-body">
                {rStudentForm({student})}
            </div>
            <div className="footer">
                <button onClick={modal.resolve}>Cancel</button>
                <button
                    className="primary"
                    disabled={saving.value}
                    onClick={async () => {
                        saving.onChange(true)
                        const newStudent = await apis.student.upsertStudent(student.value);
                        onDone(newStudent);
                        saving.onChange(false)
                        modal.resolve();
                    }}
                >Save</button>
            </div>
        </div>
    )
);
