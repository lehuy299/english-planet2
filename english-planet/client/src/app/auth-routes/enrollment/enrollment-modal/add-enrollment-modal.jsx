import React from "react";
import {bindInputNumber} from "../../../../../../../common/react/bind-input-number";
import {scope} from "../../../../../../../common/react/scope";
import {cs, State, Load2, consumeContext} from "cs-react"
import {ModalService} from "../../../common/modal/modal-service";
import {DatePicker} from "../../../common/date-picker/date-picker";
import {DropdownSelectSearch} from "../../../common/dropdown-select/dropdown-select-search";
import {spc} from "../../../../../../../common/react/state-path-change";
import "./add-enrollment-modal.scss";

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
                    <div className="student-name">{resolve.getStudent(enrollment.value.student_id).name}</div>
                    <div className="class-name">{resolve.getClass(enrollment.value.class_id)?.name || "New Enrollment"}</div>
                    <div className="form-group">
                        <div className="control-label">Class</div>
                        {DropdownSelectSearch({
                            list: resolve.classes,
                            isSelected: (c) => enrollment.value.class_id === c.id,
                            onChange: (c) => spc(enrollment, ["class_id"], () => c.id),
                            valueToLabel: (c) => c.name,
                            valueToSearch: (c) => c.name,
                        })}
                    </div>

                    <div className="line">
                        <div className="form-group">
                            <div className="control-label">Start</div>
                            {DatePicker({...scope(enrollment, ["date_start"])})}
                        </div>
                        <div className="form-group">
                            <div className="control-label">End</div>
                            {DatePicker({...scope(enrollment, ["date_end"])})}
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="control-label">Fee</div>
                        <input {...bindInputNumber(scope(enrollment, ["fee"]))} />
                    </div>
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
