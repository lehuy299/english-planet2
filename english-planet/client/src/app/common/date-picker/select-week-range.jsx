import React from "react";
import {cs, State} from "cs-react";
import {Dropdown} from "../dropdown/dropdown";
import {parseDate, serializeDate} from "../../../../../../common/utils/date-object";
import {WeekCalendar} from "./week-calendar";
import "./select-week-range.scss";

export const SelectWeekRange = ({value, onChange}) => cs(
    ({}) => {
        return Dropdown({
            className: "select-week-range-4s2 select-week-range",
            renderToggle: ({showExpand, showingExpand}) => (
                <div 
                    className="toggle"
                    onClick={() => showExpand(!showingExpand)}
                >
                    {serializeDate(value.from)}{" - "}{serializeDate(value.to)}
                </div>
            ),
            renderExpand: ({close}) => (
                WeekCalendar({
                    value,
                    onChange: (range1) => {
                        onChange(range1);
                        close();
                    }, 
                })
            )
        })
    }
);
