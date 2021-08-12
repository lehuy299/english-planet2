import React from "react";
import {Calendar} from "./calendar";
import {cs, State} from "cs-react";
import {Dropdown} from "../dropdown/dropdown";
import {parseDate, serializeDate} from "../../../../../../common/utils/date-object";

export const DatePicker = ({value, onChange, ...props}) => cs(
    ["typing", (_, next) => State({next})],
    ({typing}) => {
        const setTyping = (typingValue) => {

            if (typingValue === "") {
                onChange(null);
            } else {
                const date = parseDate(typingValue);
                if (date) {
                    onChange(date);
                }
            }

            typing.onChange(typingValue);
        };

        return (
            <div className="date-picker">
                {Dropdown({
                    renderToggle: ({showExpand, showingExpand}) => (
                        <input
                            className="input"
                            placeholder="yyyy-mm-dd"
                            value={typing.value || (value == null ? "" : serializeDate(value))}
                            onChange={(e) => setTyping(e.target.value)}
                            onBlur={() => typing.onChange()}
                            autoFocus={props.autoFocus}
                            onClick={() => showExpand(!showingExpand)}
                        />
                    ),
                    renderExpand: ({close}) => (
                        <Calendar
                            className="calendar"
                            selectedDate={value}
                            onChange={(v) => {
                                onChange(v);
                                close();
                            }}
                        />
                    )
                })}
            </div>
        )
    }
);

