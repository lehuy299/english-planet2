import React from "react";
import {cs} from "cs-react";
import {PrintService} from "../../../common/print-service/print-service";
import {formatNumberBig} from "../../../../../../../common/formats/formats";

export const PrintReceiptService = ({student, class1, next}) => cs(
    ["printService", ({}, next) => PrintService({
        print: (receipt) => rPrintedReceipt({receipt, class1, student}),
        next,
    })],
    ({printService}) => next({
        print: (receipt) => printService.print(receipt)
    }),
);

const rPrintedReceipt = ({receipt, class1, student}) => {
    return (
        <div className="printed-receipt-33t">
            <div className="title">
                Receipt
            </div>
            <div className="content">
                <div className="">
                    Name: {student.name}
                </div>
                <div className="">
                    Class: {class1.name}
                </div>
                {(() => {
                    const subtotal = receipt.amount;
                    const discountAmount = !receipt.discount?.type ? 0 : (
                        receipt.discount.type === "percent" ? (receipt.discount.value ?? 0) * subtotal : (receipt.discount.value ?? 0)
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
        </div>
    )
};
