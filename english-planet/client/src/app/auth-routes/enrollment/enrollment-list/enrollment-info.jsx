import React from "react";
import {cs, consumeContext, Load} from "cs-react";
import {equalDeep} from "../../../../../../../common/utils/equal-deep";
import {EnrollmentForm} from "./enrollment-form";
import {EnrollmentDetailsModal} from "../enrollment-modal/enrollment-details-modal";
import "./enrollment-info.scss";
import {ge, le} from "../../../../../../../common/utils/date-object";
import {PerformanceReportModal} from "../enrollment-modal/performance-report-modal";

export const EnrollmentInfo = ({enrollment, oriErm, receipts, onDelete}) => cs(
    consumeContext("resolve"),
    consumeContext("apis"),
    ["allClassDates", ({apis}, next) => Load({
        fetch: () => apis.classDate.getClassDatesOfClass(enrollment.value.class_id),
        next,
    })],
    ["detailsModal", (_, next) => EnrollmentDetailsModal({next})],
    ["performanceReportModal", (_, next) => PerformanceReportModal({next})],
    ({resolve, apis, detailsModal, performanceReportModal, allClassDates}) => {
        const classDates = allClassDates?.filter((cd) =>
            (!enrollment.value.date_start || ge(cd.date, enrollment.value.date_start)) && (!enrollment.value.date_end || le(cd.date, enrollment.value.date_end))
        );
        return (
            <div className="enrollment-info-8g3">
                <div className="controls">
                    <button
                        className="primary"
                        disabled={equalDeep(oriErm.value, enrollment.value)}
                        onClick={async () => {
                            const update = await apis.enrollment.upsertEnrollment(enrollment.value);
                            oriErm.onChange(update);
                        }}
                    >Save</button>
                    <button
                        className="default"
                        disabled={!equalDeep(oriErm.value, enrollment.value)}
                        onClick={() => detailsModal.show({enrollment: enrollment.value, classDates})}
                    >Details</button>
                    <button
                        className="default"
                        disabled={!equalDeep(oriErm.value, enrollment.value)}
                        onClick={() => performanceReportModal.show({enrollment: enrollment.value, classDates})}
                    >Performance</button>
                    <button
                        className="danger"
                        onClick={async () => {
                            if (!confirm("Are you sure?")) {
                                return;
                            }
                            await apis.enrollment.deleteEnrollment(enrollment.value.id);
                            onDelete(enrollment.value.id);
                        }}
                    >Delete</button>
                </div>
                <div className="form">
                    {EnrollmentForm({
                        enrollment, 
                        classDates,
                        receipts: receipts.value,
                        notAllowChangingClass: true
                    })}
                </div>
            </div>
        )
    }
);
