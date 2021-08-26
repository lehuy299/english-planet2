import React from "react";
import {cs, consumeContext} from "cs-react";
import "./enrollment-form.scss";
import {getClassDates} from "../enrollment-utils";
import {DropdownSelectSearch} from "../../../common/dropdown-select/dropdown-select-search";
import {scope} from "../../../../../../../common/react/scope";
import {DatePicker} from "../../../common/date-picker/date-picker";
import {sum} from "../../../../../../../common/utils/collections";
import {formatNumberBig} from "../../../../../../../common/formats/formats";
import {spc} from "../../../../../../../common/react/state-path-change";
import {bindInputNumber} from "../../../../../../../common/react/bind-input-number";
import { DaysOfWeekSelect2 } from "../../../common/days-of-week-select";

export const EnrollmentForm = ({enrollment, classDates, receipts, notAllowChangingClass}) => cs(
    consumeContext("resolve"),
    ({resolve}) => {
        const class1 = resolve.getClass(enrollment.value.class_id);
        return (
            <div className="enrollment-form-g42">
                <div className="student-name">
                    Student: {resolve.getStudent(enrollment.value.student_id)?.name}
                </div>
                <div className="class-name">
                    Class: {class1?.name || "New Enrollment"}
                </div>
                {!notAllowChangingClass && (
                    <div className="form-group">
                        <div className="control-label">Class</div>
                        {DropdownSelectSearch({
                            list: resolve.classes,
                            isSelected: (c) => enrollment.value.class_id === c.id,
                            onChange: (c) => spc(enrollment, ["class_id"], () => c.id),
                            valueToLabel: (c) => c.name,
                            valueToSearch: (c) => c.name,
                        })}
                    </div>
                )}

                <div className="line">
                    <div className="form-group">
                        <div className="control-label">Start</div>
                        {(() => {
                            const {value, onChange} = scope(enrollment, ["date_start"]);
                            return DatePicker({
                                value: value || class1?.date_start,
                                onChange,
                            })
                        })()}
                    </div>
                    <div className="form-group">
                        <div className="control-label">End</div>
                        {(() => {
                            const {value, onChange} = scope(enrollment, ["date_end"]);
                            return DatePicker({
                                value: value || class1?.date_end,
                                onChange,
                            })
                        })()}
                    </div>
                </div>
                <div className="form-group">
                    <div className="control-label">Days of week</div>
                    {(() => {
                        const {value, onChange} = scope(enrollment, ["days_of_week"]);

                        return DaysOfWeekSelect2(
                            {
                                value: value || class1?.days_of_week,
                                onChange,
                            },
                            class1?.days_of_week
                            )
                    })()}
                </div>
                <div className="form-group">
                    <div className="control-label">Fee per class date</div>
                    {(() => {
                        const {value, onChange} = scope(enrollment, ["fee"]);
                        return <input {
                            ...bindInputNumber({
                                value: value || class1?.fee,
                                onChange,
                            })
                        } />
                    })()}
                </div>

                {class1 && classDates && (() => {
                    const numberOfClassDates = classDates.length;
                    const totalFee = numberOfClassDates * (enrollment.value.fee ?? class1.fee ?? 0);
                    const paidAndLeft = (() => {
                        if (!receipts) {
                            return;
                        }
                        const paid = sum(receipts.map((r) => r.amount));
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
                        <div className="fee">
                            <div className="number-of-class-dates">
                                Number of class dates: {numberOfClassDates}
                            </div>
                            <div className="total-fee">
                                Total fee: {formatNumberBig(totalFee)}
                            </div>
                            {paidAndLeft}
                        </div>
                    )
                })()}
            </div>
        )
    }
);
