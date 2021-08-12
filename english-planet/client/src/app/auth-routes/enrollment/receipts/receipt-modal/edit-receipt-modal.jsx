import React from "react";
import {bindInputNumber} from "../../../../../../../../common/react/bind-input-number";
import {scope} from "../../../../../../../../common/react/scope";
import {cs, State, Load2, consumeContext} from "cs-react"
import {ModalService} from "../../../../common/modal/modal-service";
import "./receipt-modal.scss";
import {equalDeep} from "../../../../../../../../common/utils/equal-deep";

export const EditReceiptModal = ({onDone, next: rootNext}) => cs(
    ["modal", ({}, next) => ModalService({
        render: ({resolve, args: receipt}) => ({
            title: "Edit Receipt",
            width: 500,
            content: next({
                resolve, receipt
            }),
        }),
        next: rootNext,
    })],
    consumeContext("resolve"),
    consumeContext("apis"),
    ["receipt1", ({modal}, next) => State({
        initValue: modal.receipt,
        next,
    })],
    ["saving", (_, next) => State({next})],
    ({modal, receipt1, resolve, apis, saving}) => {
        return (
            <div className="add-receipt-modal-2rg">
                <div className="modal-body">
                    {receiptForm({receipt: receipt1})}
                </div>
                <div className="footer">
                    <button className="" onClick={modal.resolve}>Cancel</button>
                    <button className="" onClick={() => {}}>Save and Print</button>
                    <button
                        className="primary"
                        disabled={equalDeep(modal.receipt, receipt1.value) || saving.value}
                        onClick={async () => {
                            saving.onChange(true);
                            const update = await apis.receipt.upsertReceipt(receipt1.value);
                            onDone(update);
                            saving.onChange(false);
                            modal.resolve();
                        }}
                    >Save</button>
                </div>
            </div>
        );
    }
);

export const receiptForm = ({receipt}) => {
    return (<>
        <div className="student-name">{resolve.getStudent(modal.enrollment.student_id).name}</div>
        <div className="class-name">{resolve.getClass(modal.enrollment.class_id).name}</div>
        <div className="form-group">
            <div className="control-label">Number</div>
            <input {...bindInputNumber(scope(receipt, ["number"]))} />
        </div>
        {/* TODO discount, format money */}
        <div className="form-group">
            <div className="control-label">Amount</div>
            <input {...bindInputNumber(scope(receipt, ["amount"]))} />
        </div>
    </>)
};
