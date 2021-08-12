import React from "react";
import {bindInput} from "../../../../../../../common/react/bind-input";
import {scope} from "../../../../../../../common/react/scope";
import {cs, State, consumeContext} from "cs-react";
import {ModalService} from "../../../common/modal/modal-service";
import "./edit-student-modal.scss";
import {DatePicker} from "../../../common/date-picker/date-picker";

export const EditStudentModal = ({onDone, onDeactivate, next: rootNext}) => cs(
    ["modal", ({}, next) => ModalService({
        render: ({resolve, args: student}) => ({
            title: "Edit Student",
            width: 500,
            content: next({
                resolve, student,
            }),
        }),
        next: rootNext,
    })],
    ["student1", ({modal}, next) => State({
        initValue: modal.student,
        next,
    })],
    ["saving", ({}, next) => State({next,})],
    consumeContext("apis"),
    ({modal, student1, apis, saving}) => (
        <div className="edit-student-modal-2fa">
            <div className="modal-body">
                {rStudentForm({student: student1})}
            </div>
            <div className="footer">
                <div className="left">
                    <button 
                        className="danger" 
                        disabled={saving.value}
                        onClick={async () => {
                            saving.onChange(true);
                            if (!confirm("Are you sure?")) {
                                return;
                            }
                            await apis.student.upsertStudent({...modal.student, inactive: true});
                            onDeactivate(modal.student);
                            saving.onChange(false);
                            modal.resolve();
                        }}
                    >Deactivate</button>
                </div>
                <div className="right">
                    <button onClick={modal.resolve}>Cancel</button>
                    <button 
                        className="primary" 
                        disabled={saving.value}
                        onClick={async () => {
                            saving.onChange(true);
                            const updated = await apis.student.upsertStudent(student1.value);
                            onDone({...updated, class_ids: student1.value.class_ids});
                            saving.onChange(false);
                            modal.resolve();
                        }}
                    >Save</button>
                </div>
            </div>
        </div>
    )
);

export const rStudentForm = ({student}) => {
    return (<>
        <div className="form-group">
            <div className="control-label">
                Name
            </div>
            <input {...bindInput(scope(student, ["name"]))} />
        </div>
        <div className="form-group">
            <div className="control-label">
                Date of Birth
            </div>
            {DatePicker({...scope(student, ["date_of_birth"])})}
        </div>
        <div className="form-group">
            <div className="control-label">
                Phone Number
            </div>
            <input {...bindInput(scope(student, ["phone_number"]))} />
        </div>
        <div className="form-group">
            <div className="control-label">
                Email
            </div>
            <input {...bindInput(scope(student, ["email"]))} />
        </div>
        <div className="form-group">
            <div className="control-label">
                Address
            </div>
            <input {...bindInput(scope(student, ["address"]))} />
        </div>
    </>)
};
