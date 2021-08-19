import React from "react";
import {cs, State, Load2, consumeContext} from "cs-react"
import {ModalService} from "../../../common/modal/modal-service";
import "./add-enrollment-modal.scss";
import {EnrollmentForm} from "../enrollment-list/enrollment-form";

export const AddEnrollmentModal = ({onDone, next: rootNext}) => cs(
    ["modal", ({}, next) => ModalService({
        render: ({resolve, args: {studentId, classId}}) => ({
            title: "Add Enrollment",
            width: 500,
            content: next({
                resolve, studentId, classId,
            }),
        }),
        next: rootNext,
    })],
    consumeContext("resolve"),
    consumeContext("apis"),
    ["enrollment", ({modal}, next) => State({
        initValue: {student_id: modal.studentId, class_id: modal.classId},
        next,
    })],
    ["saving", (_, next) => State({next})],
    ({modal, enrollment, resolve, apis, saving}) => {
        return (
            <div className="add-enrollment-modal-2rg">
                <div className="modal-body">
                    {EnrollmentForm({enrollment})}
                </div>
                <div className="footer">
                    <button className="" onClick={modal.resolve}>Cancel</button>
                    <button
                        className="primary"
                        disabled={saving.value}
                        onClick={async () => {
                            saving.onChange(true);
                            const newEnrollment = await apis.enrollment.upsertEnrollment(enrollment.value);
                            onDone(newEnrollment);
                            saving.onChange(false);
                            modal.resolve();
                        }}
                    >Save</button>
                </div>
            </div>
        );
    }
);
