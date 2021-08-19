import * as React from "react";
import {cs} from "cs-react";
import "./radio-line.scss";
import {cx} from "emotion";

export const RadioLine = ({selected, onClick, label, content, className, disabled}) => cs(
    ({}) => (
        <div
            className={cx("radio-line radio-line-6fk", className, {hasContent: content})}
            onClick={(e) => !disabled && onClick(e)}
        >
            <div className={cx("radio", {selected}, {disabled})}/>

            {label && (
                <div className="label">
                    {label}
                </div>
            )}
            {content && (
                <div className="content">
                    {content}
                </div>
            )}
        </div>
    )
);
