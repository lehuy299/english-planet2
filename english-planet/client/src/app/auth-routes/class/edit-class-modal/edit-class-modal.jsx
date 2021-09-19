import React from "react";
import {bindInput} from "../../../../../../../common/react/bind-input";
import {scope} from "../../../../../../../common/react/scope";
import {cs, State, consumeContext} from "cs-react";
import {ModalService} from "../../../common/modal/modal-service";
import {DatePicker} from "../../../common/date-picker/date-picker";
import "./edit-class-modal.scss";
import { DaysOfWeekSelect } from "../../../common/days-of-week-select";
import {generateClassDatesForDates} from "../../timetable/class-date-generator";
import {equalDeep} from "../../../../../../../common/utils/equal-deep";
import {RoomSelect} from "../../common/room-select/room-select";
import {TimePicker} from "../../../common/time-picker/time-picker";
import {DropdownSelectSearch} from "../../../common/dropdown-select/dropdown-select-search";
import {spc} from "../../../../../../../common/react/state-path-change";

export const EditClassModal = ({onDone, onDeactivate, next: rootNext}) => cs(
    ["modal", ({}, next) => ModalService({
        render: ({resolve, args: class0}) => ({
            title: "Edit Class",
            width: 700,
            content: next({
                resolve, class0,
            }),
        }),
        next: rootNext,
    })],
    ["class1", ({modal}, next) => State({
        initValue: modal.class0,
        next,
    })],
    ["saving", ({}, next) => State({next,})],
    consumeContext("apis"),
    consumeContext("resolve"),
    ({modal, class1, apis, saving, resolve}) => (
        <div className="edit-class-modal-2fa">
            <div className="modal-body">
                {rClassForm({class0: class1, teachers: resolve.teachers})}
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
                            await apis.class.upsertClass({...modal.class0, inactive: true})
                            onDeactivate(modal.class0);
                            saving.onChange(false);
                            modal.resolve();
                        }}
                    >Deactivate</button>
                    <button
                        disabled={modal.class0.class_dates_generated || !modal.class0.days_of_week || !modal.class0.date_start || !modal.class0.date_end}
                        onClick={async () => {
                            saving.onChange(true);

                            if (!equalDeep(class1.value, modal.class0)) {
                                alert("Please save any changes before auto-generate class dates.");
                                saving.onChange(false);
                                return;
                            }

                            await apis.classDate.createClassDates(
                                generateClassDatesForDates({
                                    dateRange: {from: modal.class0.date_start, to: modal.class0.date_end},
                                    classes: [modal.class0],
                                    isAuto: true,
                                })
                            );

                            const newClass = await apis.class.upsertClass({...modal.class0, class_dates_generated: true});

                            saving.onChange(false);
                            onDone(newClass);
                            modal.resolve();
                        }}
                    >Auto-generate class dates</button>
                </div>
                <div className="right">
                    <button onClick={modal.resolve}>Cancel</button>
                    <button 
                        className="primary" 
                        disabled={equalDeep(class1.value, modal.class0) || saving.value}
                        onClick={async () => {
                            const needRegenerateClassDates = (
                                class1.value.date_start !== modal.class0.date_start
                                || class1.value.date_end !== modal.class0.date_end
                                || class1.value.days_of_week !== modal.class0.days_of_week
                                || class1.value.time !== modal.class0.time
                                || class1.value.room !== modal.class0.room
                                || class1.value.teacher_id !== modal.class0.teacher_id
                            );

                            saving.onChange(true);

                            const updated = await apis.class.upsertClass(class1.value);
                            onDone(updated);

                            if (updated.class_dates_generated && needRegenerateClassDates) {
                                if (confirm("Do you want to re-generate class dates?")) {
                                    try {
                                        await apis.classDate.deleteClassDatesOfClass(updated.id);

                                        await apis.classDate.createClassDates(
                                            generateClassDatesForDates({
                                                dateRange: {from: updated.date_start, to: updated.date_end},
                                                classes: [updated],
                                                isAuto: true,
                                            })
                                        );
                                    } catch (e) {
                                        throw(e);
                                    }
                                }
                            }
                            
                            saving.onChange(false);
                            modal.resolve();
                        }}>Save</button>
                </div>
            </div>
        </div>
    )
);

export const rClassForm = ({class0, teachers}) => {
    return(<>
        <div className="form-group">
            <div className="control-label">
                Class Name
            </div>
            <input {...bindInput(scope(class0, ["name"]))} />
        </div>
        <div className="form-group">
            <div className="control-label">
                Room
            </div>
            {/* {RoomSelect(scope(class0, ["room"]))} */}
            <input {...bindInput(scope(class0, ["room"]))} />
        </div>
        <div className="form-group">
            <div className="control-label">
                Teacher
            </div>
            {DropdownSelectSearch({
                list: teachers,
                isSelected: (t) => class0.value?.teacher_id === t.id,
                onChange: (t) => spc(class0, ["teacher_id"], () => t.id),
                valueToLabel: (t) => t.name,
                valueToSearch: (t) => t.name,
            })} 
        </div>
        <div className="form-group">
            <div className="control-label">
                Time
            </div>
            {TimePicker({
                from: 7, to: 21, step: 15,
                ...scope(class0, ["time"])
            })}
        </div>
        <div className="form-group">
            <div className="control-label">
                Fee per class date
            </div>
            <input {...bindInput(scope(class0, ["fee"]))} />
        </div>
        <div className="form-group">
            <div className="control-label">
                Date of week
            </div>
            {DaysOfWeekSelect(scope(class0, ["days_of_week"]))}
        </div>
        <div className="form-group">
            <div className="control-label">
                Started date
            </div>
            {DatePicker({...scope(class0, ["date_start"])})}
        </div>
        <div className="form-group">
            <div className="control-label">
                End date
            </div>
            {DatePicker({...scope(class0, ["date_end"])})}
        </div>
    </>)
};
