import React from "react";
import {scope} from "../../../../../../../common/react/scope";
import {cs, State, consumeContext} from "cs-react";
import {ModalService} from "../../../common/modal/modal-service";
import "./edit-class-date-modal.scss";
import {DropdownSelect} from "../../../common/dropdown-select/dropdown-select";
import rooms from "../../common/room-select/rooms";
import {TimePicker} from "../../../common/time-picker/time-picker";
import {stateToSelect} from "../../../common/dropdown-select/state-to-select";
import {DatePicker} from "../../../common/date-picker/date-picker";
import {equalDeep} from "../../../../../../../common/utils/equal-deep";
import {RoomSelect} from "../../common/room-select/room-select";
import {bindInput} from "../../../../../../../common/react/bind-input";

export const EditClassDateModal = ({next: rootNext}) => cs(
    ["modal", ({}, next) => ModalService({
        render: ({resolve, args: classDate}) => ({
            title: "Edit Class Date",
            width: 500,
            content: next({
                resolve, classDate,
            }),
        }),
        next: rootNext,
    })],
    ["classDate1", ({modal}, next) => State({
        initValue: modal.classDate,
        next,
    })],
    ["saving", ({}, next) => State({next,})],
    consumeContext("apis"),
    consumeContext("cds"),
    ({modal, classDate1, apis, cds, saving}) => (
        <div className="edit-class-date-modal-f32">
            <div className="modal-body">
                {rClassDateForm({classDate: classDate1})}
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
                            await apis.classDate.deleteClassDate(modal.classDate.id);
                            cds.deleteClassDate(modal.classDate.id);
                            saving.onChange(false);
                            modal.resolve();
                        }}
                    >Delete</button>
                </div>
                <div className="right">
                    <button onClick={modal.resolve}>Cancel</button>
                    <button 
                        className="primary" 
                        disabled={equalDeep(modal.classDate, classDate1.value) || saving.value}
                        onClick={async () => {
                            saving.onChange(true);
                            const updated = await apis.classDate.upsertClassDate(classDate1.value);
                            cds.updateClassDate(updated);
                            saving.onChange(false);
                            modal.resolve();
                        }}
                    >Save</button>
                </div>
            </div>
        </div>
    )
);

export const rClassDateForm = ({classDate}) => cs(
    consumeContext("resolve"),
    ({resolve}) => {
        const class1 = resolve.getClass(classDate.value.class_id);
        return (<>
            <div className="form-group">
                <div className="control-label">
                    Date
                </div>
                {DatePicker({...scope(classDate, ["date"])})}
            </div>
            <div className="form-group">
                <div className="control-label">
                    Time
                </div>
                {TimePicker({
                    from: 7, to: 21, step: 15,
                    ...scope(classDate, ["time"])
                })}
            </div>
            <div className="form-group">
                <div className="control-label">
                    Room
                </div>
                <input {...bindInput(scope(classDate, ["room"]))} />
                {/* {(() => {
                    const {value, onChange} = scope(classDate, ["room"]);
                    return RoomSelect({
                        value: value || class1?.room,
                        onChange,
                    })
                })()} */}
            </div>
            <div className="form-group">
                <div className="control-label">
                    Teacher
                </div>
                {DropdownSelect({
                    list: resolve.teachers,
                    valueToLabel: (t) => t.name,
                    ...stateToSelect(scope(classDate, ["teacher_id"]), ["id"]),
                })}
            </div>
        </>)
    }
);
