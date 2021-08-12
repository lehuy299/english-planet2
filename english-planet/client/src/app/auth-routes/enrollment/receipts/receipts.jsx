import React from "react";
import {cs, consumeContext, Load2} from "cs-react";
import {DataTable} from "../../../common/data-table/data-table";
import "./receipts.scss";
import {AddReceiptModal} from "./receipt-modal/add-receipt-modal";
import {EditReceiptModal} from "./receipt-modal/edit-receipt-modal";
import {replaceFind} from "../../../../../../../common/utils/collections";

export const Receipts = ({enrollment}) => cs(
    consumeContext("apis"),
    ["receipts", ({apis}, next) => Load2({
        fetch: () => apis.enrollment.getReceipts(enrollment.value.id),
        next,
    })],
    ["addReceiptModal", ({receipts}, next) => AddReceiptModal({
        onDone: (newReceipt) => receipts.onChange([...(receipts.value || []), newReceipt]),
        next,
    })],
    ["editReceiptModal", ({receipts}, next) => EditReceiptModal({
        onDone: (update) => receipts.onChange(replaceFind(receipts.value, update, (r) => r.id === update.id)),
        next,
    })],
    ({receipts, addReceiptModal, editReceiptModal}) => {
        return (
            <div className="receipts-4gt">
                <div className="controls">
                    <button 
                        className="primary"
                        onClick={() => addReceiptModal.show(enrollment.value)}
                    >Add</button>
                </div>

                <div className="list">
                    {DataTable({
                        list: receipts.value,
                        columns: [
                            {
                                label: "Number",
                                format: (r) => r.number,
                            },
                            {
                                label: "Time",
                                format: (r) => r.time,
                            },
                            {
                                label: "Discount",
                                format: (r) => r.discount?.value,
                            },
                            {
                                label: "Amount",
                                format: (r) => r.amount,
                            },
                            {
                                format: (r) => (<>
                                    <button
                                        onClick={() => editReceiptModal.show(r)}
                                    >Edit</button>
                                    <button
                                        onClick={() => {}}
                                    >Print</button>
                                </>)
                            }
                        ],
                    })}
                </div>
            </div>  
        )
    }
);
