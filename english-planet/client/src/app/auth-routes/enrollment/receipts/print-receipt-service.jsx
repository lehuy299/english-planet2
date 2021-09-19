import React from "react";
import {cs} from "cs-react";
import {PrintService} from "../../../common/print-service/print-service";
import {formatNumberBig} from "../../../../../../../common/formats/formats";
import {getFigures} from "./receipt-helpers";

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
                    const {subtotal, discountAmount, total} = getFigures(receipt);

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
