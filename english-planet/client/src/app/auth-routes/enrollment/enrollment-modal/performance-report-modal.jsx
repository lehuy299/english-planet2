import React from "react";
import {cs, consumeContext} from "cs-react"
import {ModalService} from "../../../common/modal/modal-service";
import "./performance-report-modal.scss";
import {formatDate} from "../../../../../../../common/formats/formats";
import {PrintService} from "../../../common/print-service/print-service";
import {getPath} from "../../../../../../../common/utils/arr-path";

export const PerformanceReportModal = ({next: rootNext}) => cs(
    ["modal", ({}, next) => ModalService({
        render: ({resolve, args: {enrollment, classDates}}) => ({
            title: "Performance Report",
            width: 600,
            content: next({
                resolve, enrollment, classDates,
            }),
        }),
        next: rootNext,
    })],
    ["printService", ({}, next) => PrintService({
        print: ({enrollment, class1, student, classDates}) => rPerformanceReport({enrollment, class1, student, classDates}),
        next,
    })],
    consumeContext("resolve"),
    consumeContext("apis"),
    ({modal, resolve, printService}) => {
        const class1 = resolve.getClass(modal.enrollment.class_id);
        const student = resolve.getStudent(modal.enrollment.student_id);
        return (
            <div className="performance-report-modal-u3f">
                <div className="modal-body">
                    {rPerformanceReport({
                        enrollment: modal.enrollment,
                        class1, student,
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
                                class1, student,
                                classDates: modal.classDates
                            })
                        }}
                    >Print</button>
                </div>
            </div>
        );
    }
);

const rPerformanceReport = ({enrollment, class1, student, classDates}) => {
    return (
        <div className="performance-report-3yg">
            <div className="title">
                Performance Report
            </div>
            <div className="subtitle">
                {student.name} - {class1.name}
            </div>
            <div className="content">
                <div className="table">
                    <table>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Absent</th>
                                <th>Comment</th>
                            </tr>
                        </thead>
                        <tbody>
                            {classDates.map((cd) => (
                                <tr
                                    key={cd.id}
                                >
                                    <td className="date">{formatDate(cd.date)}</td>
                                    <td className="absent">
                                        {getPath(cd, ["performance", enrollment.student_id, "absent"]) ? "x" : ""}
                                    </td>
                                    <td className="comment">
                                        {getPath(cd, ["performance", enrollment.student_id, "comment"]) ?? ""}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
};
