import React from "react";
import {bindInputNumber} from "../../../../../../../../common/react/bind-input-number";
import {scope} from "../../../../../../../../common/react/scope";
import {cs, State, Load2, consumeContext} from "cs-react"
import {ModalService} from "../../../../common/modal/modal-service";
import "./receipt-modal.scss";

export const AddReceiptModal = ({onDone, next: rootNext}) => cs(
    ["modal", ({}, next) => ModalService({
        render: ({resolve, args: enrollment}) => ({
            title: "Add Receipt",
            width: 500,
            content: next({
                resolve, enrollment
            }),
        }),
        next: rootNext,
    })],
    consumeContext("resolve"),
    consumeContext("apis"),
    ["receipt", ({modal}, next) => State({
        initValue: {enrollment_id: modal.enrollment.id},
        next,
    })],
    ["saving", (_, next) => State({next})],
    ({modal, receipt, resolve, apis, saving}) => {
        return (
            <div className="receipt-modal-2rg">
                <div className="modal-body">
                    {receiptForm({receipt, enrollment: modal.enrollment})}
                </div>
                <div className="footer">
                    <button className="" onClick={modal.resolve}>Cancel</button>
                    <button className="" onClick={() => {}}>Save and Print</button>
                    <button
                        className="primary"
                        disabled={saving.value}
                        onClick={async () => {
                            saving.onChange(true);
                            const newReceipt = await apis.receipt.upsertReceipt(receipt.value);
                            onDone(newReceipt);
                            saving.onChange(false);
                            modal.resolve();
                        }}
                    >Save</button>
                </div>
            </div>
        );
    }
);

export const receiptForm = ({receipt, enrollment}) => cs(
    consumeContext("resolve"),
    ({resolve}) => {
        return (<>
            <div className="student-name">{resolve.getStudent(enrollment.student_id).name}</div>
            <div className="class-name">{resolve.getClass(enrollment.class_id).name}</div>
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
    }
);
