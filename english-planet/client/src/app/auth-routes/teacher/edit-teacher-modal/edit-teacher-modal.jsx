import React from "react";
import {bindInput} from "../../../../../../../common/react/bind-input";
import {scope} from "../../../../../../../common/react/scope";
import {cs, State, consumeContext} from "cs-react";
import {ModalService} from "../../../common/modal/modal-service";
import "./edit-teacher-modal.scss";
import {DatePicker} from "../../../common/date-picker/date-picker";

export const EditTeacherModal = ({onDone, onDeactivate, next: rootNext}) => cs(
    ["modal", ({}, next) => ModalService({
        render: ({resolve, args: teacher}) => ({
            title: "Edit Teacher",
            width: 500,
            content: next({
                resolve, teacher,
            }),
        }),
        next: rootNext,
    })],
    ["teacher1", ({modal}, next) => State({
        initValue: modal.teacher,
        next,
    })],
    ["saving", ({}, next) => State({next,})],
    consumeContext("apis"),
    ({modal, teacher1, apis, saving}) => (
        <div className="edit-teacher-modal-2fa">
            <div className="modal-body">
                {rTeacherForm({teacher: teacher1})}
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
                            await apis.teacher.upsertTeacher({...modal.teacher, inactive: true});
                            onDeactivate(modal.teacher);
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
                            const updated = await apis.teacher.upsertTeacher(teacher1.value);
                            onDone({...updated, class_ids: teacher1.value.class_ids});
                            saving.onChange(false);
                            modal.resolve();
                        }}
                    >Save</button>
                </div>
            </div>
        </div>
    )
);

export const rTeacherForm = ({teacher}) => {
    return (<>
        <div className="form-group">
            <div className="control-label">
                Name
            </div>
            <input {...bindInput(scope(teacher, ["name"]))} />
        </div>
        <div className="form-group">
            <div className="control-label">
                Phone Number
            </div>
            <input {...bindInput(scope(teacher, ["phone_number"]))} />
        </div>
        <div className="form-group">
            <div className="control-label">
                Email
            </div>
            <input {...bindInput(scope(teacher, ["email"]))} />
        </div>
        <div className="form-group">
            <div className="control-label">
                Address
            </div>
            <input {...bindInput(scope(teacher, ["address"]))} />
        </div>
    </>)
};
