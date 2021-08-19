import React from "react";
import {cs, consumeContext, Load2} from "cs-react";
import {DataTable} from "../../../common/data-table/data-table";
import "./receipts.scss";
import {AddReceiptModal} from "./receipt-modal/add-receipt-modal";
import {EditReceiptModal} from "./receipt-modal/edit-receipt-modal";
import {replaceFind, sort} from "../../../../../../../common/utils/collections";
import {PrintReceiptService} from "./print-receipt-service";
import {formatNumberBig, formatTimeStampShort} from "../../../../../../../common/formats/formats";

export const Receipts = ({enrollment, receipts}) => cs(
    consumeContext("apis"),
    consumeContext("resolve"),
    ["addReceiptModal", ({}, next) => AddReceiptModal({
        onDone: (newReceipt) => receipts.onChange([...(receipts.value || []), newReceipt]),
        next,
    })],
    ["editReceiptModal", ({}, next) => EditReceiptModal({
        onDone: (update) => receipts.onChange(replaceFind(receipts.value, update, (r) => r.id === update.id)),
        onDelete: (id) => receipts.onChange(receipts.value.filter((r) => r.id !== id)),
        next,
    })],
    ["printReceiptService", ({resolve}, next) => PrintReceiptService({
        class1: resolve.getClass(enrollment.value.class_id),
        student: resolve.getStudent(enrollment.value.student_id),
        next
    })],
    ({addReceiptModal, editReceiptModal, printReceiptService}) => {
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
                        list: sort(receipts.value, (r) => r.time),
                        columns: [
                            // {
                            //     label: "Number",
                            //     format: (r) => r.number,
                            // },
                            {
                                label: "Time",
                                format: (r) => formatTimeStampShort(r.time),
                            },
                            {
                                label: "Discount",
                                format: (r) => {
                                    if (!r.discount || !r.discount.type) {
                                        return;
                                    }
                                    return r.discount.value + (r.discount.type === "percent" ? "%" : "");
                                },
                            },
                            {
                                label: "Amount",
                                format: (r) => formatNumberBig(r.amount),
                            },
                            {
                                format: (r) => (<>
                                    <button
                                        onClick={() => editReceiptModal.show({receipt: r, enrollment: enrollment.value})}
                                    >Edit</button>
                                    <button
                                        onClick={() => printReceiptService.print(r)}
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
