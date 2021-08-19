import React from "react";
import {bindInputNumber} from "../../../../../../../../common/react/bind-input-number";
import {scope} from "../../../../../../../../common/react/scope";
import {cs, State, Load2, consumeContext, keyed} from "cs-react"
import {ModalService} from "../../../../common/modal/modal-service";
import "./receipt-modal.scss";
import {RadioLine} from "../../../../common/radio-line/radio-line";
import {spc} from "../../../../../../../../common/react/state-path-change";
import {upperCase1} from "../../../../../../../../common/utils/strings";
import {formatNumberBig} from "../../../../../../../../common/formats/formats";

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
            <div className="add-receipt-modal-2rg">
                <div className="modal-body">
                    {receiptForm({receipt, enrollment: modal.enrollment})}
                </div>
                <div className="footer">
                    <button className="" onClick={modal.resolve}>Cancel</button>
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
        return (
            <div className="receipt-form-4gt">
                <div className="form-area">
                    <div className="student-name">{resolve.getStudent(enrollment.student_id).name}</div>
                    <div className="class-name">{resolve.getClass(enrollment.class_id).name}</div>
                    {/* <div className="form-group">
                        <div className="control-label">Number</div>
                        <input {...bindInputNumber(scope(receipt, ["number"]))} />
                    </div> */}
                    <div className="form-group">
                        <div className="control-label">Discount</div>
                        {["Percent", "Amount"].map((t) => cs(
                            keyed(t),
                            ({}) => {
                                const selected = receipt.value?.discount?.type === t.toLowerCase();
                                return RadioLine({
                                    label: t,
                                    selected,
                                    onClick: () => spc(receipt, ["discount", "type"], () => selected ? null : t.toLowerCase()),
                                });
                            }
                        ))}
                        {receipt.value?.discount?.type && (
                            <input {...{
                                ...bindInputNumber(scope(receipt, ["discount", "value"])),
                                placeHolder: upperCase1(receipt.value.discount.type)
                            }} />
                        )}
                    </div>
                    {/* TODO format money */}
                    <div className="form-group">
                        <div className="control-label">Amount</div>
                        <input {...bindInputNumber(scope(receipt, ["amount"]))} />
                    </div>
                </div>
                {(() => {
                    const subtotal = receipt.value.amount ?? 0;
                    const discountAmount = !receipt.value.discount?.type ? 0 : (
                        receipt.value.discount.type === "percent" ? (receipt.value.discount.value ?? 0) * subtotal : (receipt.value.discount.value ?? 0)
                    );
                    const total = subtotal - discountAmount;

                    return (
                        <div className="total-area">
                            <div className="">
                                Subtotal: {formatNumberBig(subtotal)}
                            </div>
                            <div className="">
                                Discount: {formatNumberBig(discountAmount)}
                            </div>
                            <div className="">
                                Total: {formatNumberBig(total)}
                            </div>
                        </div>
                    )
                })()}
            </div>
        )
    }
);
