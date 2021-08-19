import "./add-class-modal.scss";
import React from "react";
import {cs, State, consumeContext} from "cs-react"
import {ModalService} from "../../../common/modal/modal-service";
import { rClassForm } from "../edit-class-modal/edit-class-modal";
import {CheckboxLine} from "../../../common/checkbox-line/checkbox-line";
import {generateClassDatesForDates} from "../../timetable/class-date-generator";
import {spc} from "../../../../../../../common/react/state-path-change";
import {DropdownSelectSearch} from "../../../common/dropdown-select/dropdown-select-search";

export const AddClassModal = ({onDone, next: rootNext}) => cs(
    ["modal", ({}, next) => ModalService({
        render: ({resolve}) => ({
            title: "Add Class",
            width: 500,
            content: next({
                resolve,
            }),
        }),
        next: rootNext,
    })],
    ["class0", (_, next) => State({next})],
    ["autoGen", (_, next) => State({next})],
    ["saving", (_, next) => State({next})],
    consumeContext("apis"),
    consumeContext("resolve"),
    ({modal, class0, apis, autoGen, saving, resolve}) => (
        <div className="add-class-modal-2rg">
            <div className="modal-body">
                {rClassForm({class0, teachers: resolve.teachers})}
                {CheckboxLine({
                    state: autoGen,
                    label: "Auto-generate class dates",
                    disabled: !class0.value?.days_of_week || !class0.value?.date_start || !class0.value?.date_end,
                })}
            </div>
            <div className="footer">
                <button className="" onClick={modal.resolve}>Cancel</button>
                <button 
                    className="primary"
                    disabled={saving.value} 
                    onClick={async () => {
                        saving.onChange(true)
                        let newClass = await apis.class.upsertClass(class0.value);
                        if (autoGen.value) {
                            await apis.classDate.createClassDates(
                                generateClassDatesForDates({
                                    dateRange: {from: newClass.date_start, to: newClass.date_end}, 
                                    classes: [newClass],
                                    isAuto: true,
                                })
                            );
                            newClass = await apis.class.upsertClass({...newClass, class_dates_generated: true});
                        }
                        onDone(newClass);
                        saving.onChange(false)
                        modal.resolve();
                }}>Save</button>
            </div>
        </div>
    )
)
