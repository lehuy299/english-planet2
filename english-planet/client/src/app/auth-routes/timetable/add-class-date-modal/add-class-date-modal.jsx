import React from "react";
import {cs, State, consumeContext} from "cs-react";
import {ModalService} from "../../../common/modal/modal-service";
import "./add-class-date-modal.scss";
import {rClassDateForm} from "../edit-class-date-modal/edit-class-date-modal";
import {DropdownSelect} from "../../../common/dropdown-select/dropdown-select";
import {stateToSelect} from "../../../common/dropdown-select/state-to-select";
import {scope} from "../../../../../../../common/react/scope";

export const AddClassDateModal = ({next: rootNext}) => cs(
    ["modal", ({}, next) => ModalService({
        render: ({resolve, args: date}) => ({
            title: "Add Class Date",
            width: 500,
            content: next({
                resolve, date,
            }),
        }),
        next: rootNext,
    })],
    ["classDate", ({modal}, next) => State({
        initValue: {date: modal.date, time: 7,},
        next,
    })],
    ["saving", ({}, next) => State({next, })],
    consumeContext("apis"),
    consumeContext("cds"),
    consumeContext("resolve"),
    ({modal, classDate, apis, resolve, cds, saving}) => (
        <div className="add-class-date-modal-f32">
            <div className="modal-body">
                <div className="form-group">
                    <div className="control-label">
                        Class
                    </div>
                    {DropdownSelect({
                        list: resolve.classes,
                        valueToLabel: (c) => c.name,
                        ...stateToSelect(scope(classDate, ["class_id"]), ["id"]),
                    })}
                </div>
                {rClassDateForm({classDate})}
            </div>
            <div className="footer">
                <button onClick={modal.resolve}>Cancel</button>
                <button
                    className="primary"
                    disabled={saving.value}
                    onClick={async () => {
                        saving.onChange(true);
                        const newClassDate = await apis.classDate.upsertClassDate(classDate.value);
                        cds.addClassDate(newClassDate);
                        saving.onChange(false);
                        modal.resolve();
                    }}
                >Save</button>
            </div>
        </div>
    )
);
