import React from "react";
import {cs, consumeContext, Load} from "cs-react"
import {ModalService} from "../../../common/modal/modal-service";
import "./payment-status-modal.scss";
import {formatNumberBig} from "../../../../../../../common/formats/formats";
import {PrintService} from "../../../common/print-service/print-service";
import {sum} from "../../../../../../../common/utils/collections";
import {ge, le} from "../../../../../../../common/utils/date-object";

export const PaymentStatusModal = ({enrollments, next: rootNext}) => cs(
    ["modal", ({}, next) => ModalService({
        render: ({resolve, args}) => ({
            title: "Payment Status",
            width: 600,
            content: next({
                resolve,
            }),
        }),
        next: rootNext,
    })],
    consumeContext("apis"),
    ["classDates", ({apis}, next) => Load({
        fetch: async () => {
            const cdsGroups = await Promise.all(enrollments.map(async (erm) => {
                const allClassDates = await apis.classDate.getClassDatesOfClass(erm.class_id);
                return {[erm.id]: allClassDates.filter((cd) => (!erm.date_start || ge(cd.date, erm.date_start)) && (!erm.date_end || le(cd.date, erm.date_end)))}
            }));
            let ret = {};
            cdsGroups.forEach((cds) => {
                const k = Object.keys(cds)[0];
                ret[k] = cds[k];
            });
            return ret;
        },
        next,
    })],
    ["receipts", ({apis}, next) => Load({
        fetch: async () => {
            const receiptsGroups = await Promise.all(enrollments.map(async (erm) => {
                const receipts = await apis.enrollment.getReceipts(erm.id);
                return {[erm.id]: receipts}
            }));
            let ret = {};
            receiptsGroups.forEach((cds) => {
                const k = Object.keys(cds)[0];
                ret[k] = cds[k];
            });
            return ret;
        },
        next,
    })],
    ["printService", ({}, next) => PrintService({
        print: (content) => content,
        next,
    })],
    consumeContext("resolve"),
    consumeContext("apis"),
    ({modal, resolve, printService, classDates, receipts}) => {
        const report = classDates && receipts && rPaymentStatusReport({
            enrollments,
            classDates, receipts,
            getClass: resolve.getClass,
            getStudent: resolve.getStudent,
        });

        return (
            <div className="payment-status-modal-u4f">
                <div className="modal-body">
                    {report}
                </div>
                <div className="footer">
                    <button className="" onClick={modal.resolve}>Cancel</button>
                    <button
                        className="primary"
                        onClick={() => {
                            printService.print(report)
                        }}
                    >Print</button>
                </div>
            </div>
        );
    }
);

const rPaymentStatusReport = ({enrollments, classDates, receipts, getStudent, getClass}) => {
    
    const rEnrollmentPayment = (enrollment) => {
        const cds = classDates[enrollment.id];
        const receipts1 = receipts[enrollment.id];
        const class1 = getClass(enrollment.class_id);

        const numberOfClassDates = cds.length;
        const totalFee = numberOfClassDates * (class1.fee ?? 0);

        const paidAndLeft = (() => {
            if (!receipts1) {
                return;
            }
            const paid = sum(receipts1.map((r) => r.amount));
            return (<>
                <div className="paid">
                    Paid: {formatNumberBig(paid)}
                </div>
                <div className="left">
                    {totalFee <= paid ? "Paid" : `Left: ${formatNumberBig(totalFee - paid)}`}
                </div>
            </>)
        })();

        return (
            <div className="enrollment-payment">
                <div className="name">
                    {getStudent(enrollment.student_id).name}
                </div>
                <div className="fee">
                    <div className="number-of-class-dates">
                        Number of class dates: {numberOfClassDates}
                    </div>
                    <div className="total-fee">
                        Total fee: {formatNumberBig(totalFee)}
                    </div>
                    {paidAndLeft}
                </div>
            </div>
        )
    };

    return (
        <div className="performance-report-3yg">
            <div className="title">
                Payment Status Report
            </div>
            <div className="content">
                {enrollments.map((erm) => (
                    <div className="" key={erm.id}>
                        {rEnrollmentPayment(erm)}
                    </div>
                ))}
            </div>
        </div>
    )
};
