import {cs} from "cs-react";
import * as React from "react";
import "./checkbox.scss";
import {cx} from "emotion";

export const Checkbox = ({state, readOnly, disabled, background}) => cs(
    ({}) => (
        <div
            className={cx("checkbox-3we checkbox", {checked: state.value, disabled})}
            style={{
                background: state.value ? background : ""
            }}
            onClick={readOnly ? undefined : ((e) => {
                e.preventDefault();
                e.stopPropagation();
                return !disabled && state.onChange(!state.value);
            })}
        >
            {state.value && (
                <i className="material-icons">{state.value === "partial" ? "remove" : "check"}</i>
            )}
        </div>
    )
);
