import React from "react";
import {cs, consumeContext} from "cs-react"
import {ModalService} from "../../../common/modal/modal-service";
import "./add-enrollment-modal.scss";
import {formatDate, formatNumberBig} from "../../../../../../../common/formats/formats";
import {PrintService} from "../../../common/print-service/print-service";

export const EnrollmentDetailsModal = ({next: rootNext}) => cs(
    ["modal", ({}, next) => ModalService({
        render: ({resolve, args: {enrollment, classDates}}) => ({
            title: "Enrollment Details",
            width: 500,
            content: next({
                resolve, enrollment, classDates,
            }),
        }),
        next: rootNext,
    })],
    ["printService", ({}, next) => PrintService({
        print: ({enrollment, class1, classDates}) => rEnrollmentClassDatesDetails({enrollment, class1, classDates}),
        next,
    })],
    consumeContext("resolve"),
    consumeContext("apis"),
    ({modal, resolve, printService}) => {
        const class1 = resolve.getClass(modal.enrollment.class_id);
        return (
            <div className="add-enrollment-modal-2rg">
                <div className="modal-body">
                    {rEnrollmentClassDatesDetails({
                        enrollment: modal.enrollment, 
                        class1, 
                        classDates: modal.classDates
                    })}
                </div>
                <div className="footer">
                    <button className="" onClick={modal.resolve}>Cancel</button>
                    <button
                        className="primary"
                        onClick={() => {
                            printService.print({
                                enrollment: modal.enrollment, 
                                class1, 
                                classDates: modal.classDates
                            })
                        }}
                    >Print</button>
                </div>
            </div>
        );
    }
);

const rEnrollmentClassDatesDetails = ({enrollment, class1, classDates}) => {
    return (
        <div className="enrollment-details-print-4t2">
            <div className="title">
                Enrollment Details
            </div>
            <div className="content">
                {classDates.map((cd, i) => (
                    <div className="" key={i}>
                        {formatDate(cd.date)}
                    </div>
                ))}

                {(() => {
                    const numberOfClassDates = classDates.length;
                    const totalFee = numberOfClassDates * (class1.fee ?? 0);
                    return (
                        <div className="fee">
                            <div className="number-of-class-dates">
                                Number of class dates: {numberOfClassDates}
                            </div>
                            <div className="total-fee">
                                Total fee: {formatNumberBig(totalFee)}
                            </div>
                        </div>
                    )
                })()}
            </div>
        </div>
    )
};
