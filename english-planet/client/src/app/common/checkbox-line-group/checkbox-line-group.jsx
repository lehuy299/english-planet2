import * as React from "react";
import {cs, keyed} from "cs-react";
import {CheckboxLine} from "../checkbox-line/checkbox-line";
import {cx} from "emotion";
import "./checkbox-line-group.scss";

export const CheckboxLineGroup = ({list, isSelected, onChange, hasError, domRef}) => cs(
    ({}) => (
        <div
            className={cx("checkbox-line-group checkbox-line-group-q46", {hasError})}
            ref={domRef}
        >
            {hasError && (
                <div className="error-message">
                    Required
                </div>
            )}
            {list?.map((line, i) => cs(
                keyed(i),
                () => (
                    CheckboxLine({
                        state: {
                            value: isSelected(line),
                            onChange: () => onChange(line),
                        },
                        label: line.label,
                    })
                ),
            ))}
        </div>
    ),
);
