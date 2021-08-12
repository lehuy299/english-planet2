import {cs} from "cs-react";
import * as React from "react";
import "./checkbox-line.scss";
import {cx} from "emotion";
import {Checkbox} from "../checkbox/checkbox";

export const CheckboxLine = ({state, label, readOnly, background, disabled}) => cs(
    ({}) => (
        <div
            className={cx("checkbox-line checkbox-line-5gh")}
            onClick={readOnly ? undefined : ((e) => {
                e.preventDefault();
                e.stopPropagation();
                return !disabled && state.onChange(!state.value);
            })}
        >
            {Checkbox({state, readOnly, background, disabled})}

            <div className="label">
                {label}
            </div>
        </div>
    )
);
