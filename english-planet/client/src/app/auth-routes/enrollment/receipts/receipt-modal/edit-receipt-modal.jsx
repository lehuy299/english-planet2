import React from "react";
import {cs, State, Load2, consumeContext} from "cs-react"
import {ModalService} from "../../../../common/modal/modal-service";
import "./receipt-modal.scss";
import {equalDeep} from "../../../../../../../../common/utils/equal-deep";
import {receiptForm} from "./add-receipt-modal";

export const EditReceiptModal = ({onDone, onDelete, next: rootNext}) => cs(
    ["modal", ({}, next) => ModalService({
        render: ({resolve, args: {receipt, enrollment}}) => ({
            title: "Edit Receipt",
            width: 500,
            content: next({
                resolve, receipt, enrollment,
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
            <div className="edit-receipt-modal-78j">
                <div className="modal-body">
                    {receiptForm({receipt: receipt1, enrollment: modal.enrollment})}
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
                                await apis.receipt.deleteReceipt(modal.receipt.id);
                                onDelete(modal.receipt.id);
                                saving.onChange(false);
                                modal.resolve();
                            }}
                        >Delete</button>
                    </div>
                    <div className="right">
                        <button className="" onClick={modal.resolve}>Cancel</button>
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
            </div>
        );
    }
);
