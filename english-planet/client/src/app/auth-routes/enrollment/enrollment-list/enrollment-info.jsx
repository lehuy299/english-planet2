import React from "react";
import {cs, consumeContext} from "cs-react";
import {DropdownSelectSearch} from "../../../common/dropdown-select/dropdown-select-search";
import {spc} from "../../../../../../../common/react/state-path-change";
import {scope} from "../../../../../../../common/react/scope";
import {DatePicker} from "../../../common/date-picker/date-picker";
import {bindInputNumber} from "../../../../../../../common/react/bind-input-number";
import {equalDeep} from "../../../../../../../common/utils/equal-deep";

export const EnrollmentInfo = ({enrollment, oriErm}) => cs(
    consumeContext("resolve"),
    consumeContext("apis"),
    ({resolve, apis}) => {
        return (
            <div className="enrollment-info">
                <div className="form">
                    <div className="student-name">{resolve.getStudent(enrollment.value.student_id)?.name}</div>
                    <div className="class-name">{resolve.getClass(enrollment.value.class_id)?.name}</div>
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

                    <div className="line">
                        <div className="form-group">
                            <div className="control-label">Start</div>
                            {DatePicker({...scope(enrollment, ["date_start"])})}
                        </div>
                        <div className="form-group">
                            <div className="control-label">End</div>
                            {DatePicker({...scope(enrollment, ["date_end"])})}
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="control-label">Fee</div>
                        <input {...bindInputNumber(scope(enrollment, ["fee"]))} />
                    </div>
                </div>

                <div className="buttons">
                    <button
                        disabled={equalDeep(oriErm.value, enrollment.value)}
                        onClick={async () => {
                            const update = await apis.enrollment.upsertEnrollment(enrollment.value);
                            oriErm.onChange(update);
                        }}
                    >Save</button>
                </div>
            </div>
        )
    }
);
