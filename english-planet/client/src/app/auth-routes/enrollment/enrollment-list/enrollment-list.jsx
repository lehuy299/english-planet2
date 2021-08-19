import React from 'react';
import {cs, consumeContext, Load2, State} from 'cs-react';
import {cx} from "emotion";
import "./enrollment-list.scss";
import {EnrollmentPanel} from './enrollment-panel';
import {replaceFind} from '../../../../../../../common/utils/collections';
import {PaymentStatusModal} from '../payment-status-modal/payment-status-modal';

export const EnrollmentList = ({enrollments, onDelete, showByStudent}) => cs(
    consumeContext("resolve"),
    ["paymentStatusModal", (_, next) => PaymentStatusModal({
        enrollments: enrollments.value,
        next,
    })],
    ["selected", (_, next) => State({
        initValue: enrollments.value[0]?.id,
        next,
    })],
    ({selected, resolve, paymentStatusModal}) => {
        return (
            <div className="enrollment-list-54g">
                <div className="controls">
                    {showByStudent && (
                        <button
                            className="primary"
                            disabled={!showByStudent}
                            onClick={() => paymentStatusModal.show()}
                        >Payment Status</button>
                    )}
                </div>
                {enrollments.loading ? "Loading..." : (<>
                    <div className="left-menu">
                        {enrollments.value?.map((erm, i) => {
                            return (
                                <div
                                    key={erm.id}
                                    className={cx("enrollment", {selected: erm.id === selected.value})}
                                    onClick={() => selected.onChange(erm.id)}
                                >
                                    {showByStudent ? resolve.getStudent(erm.student_id).name : resolve.getClass(erm.class_id).name}
                                </div>
                            );
                        })}
                    </div>
                    <div className="main-panel" key={selected.value}>
                        {EnrollmentPanel({
                            enrollment: {
                                value: enrollments.value.find((e) => e.id === selected.value),
                                onChange: (update) => enrollments.onChange(replaceFind(enrollments.value, update, (e) => e.id === update.id)),
                            },
                            onDelete: (id) => {
                                selected.onChange(enrollments.value.filter((e) => e.id !== id)[0]?.id);
                                onDelete(id);
                            },
                        })}
                    </div>
                </>)}
            </div>
        )
    }
);
