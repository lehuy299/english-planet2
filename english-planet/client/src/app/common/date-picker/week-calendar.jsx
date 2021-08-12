import React from "react";
import {cs, State} from "cs-react";
import "./week-calendar.scss";
import {weekDays, fillRange} from "./calendar";
import {cx} from "emotion";
import {getMonthWeeks, getWeekRange, sameDate, today2} from "../../../../../../common/utils/date-object";
import {keepOnly, omit} from "../../../../../../common/utils/objects";
import {spc} from "../../../../../../common/react/state-path-change";
import {renderSelect} from "../dropdown-select/select";
import {createArray} from "../../../../../../common/utils/collections";

export const WeekCalendar = ({value, onChange}) => cs(
    ["state", (_, next) => State({
        getInitValue: () => {
            if (!value.from || !value.to) {
                return keepOnly(today2(), ["month", "year"]);
            }

            return {month: value.from.month, year: value.from.year};
        },
        next,
    })],
    ({state}) => {
        const {month, year} = state.value;
        
        const thisWeek = getWeekRange(today2());

        const renderWeek = (weekDays) => (
            <div
                className={cx("date-row", {
                    thisWeek: sameDate(weekDays[0], thisWeek.from) && sameDate(weekDays[6], thisWeek.to),
                    selected: value && sameDate(weekDays[0], value.from) && sameDate(weekDays[6], value.to),
                })}
                key={`${weekDays[0].month}-${weekDays[0].day}`}
                onClick={() => onChange({from: omit(weekDays[0], ["dow"]), to: omit(weekDays[6], ["dow"])})}
            >
                {weekDays.map((wd) => {
                    return (
                        <div
                            key={wd.day}
                            className={cx("day", {out: wd.month !== month})}
                        >
                            {wd.day}
                        </div>
                    );
                })}
            </div>
        );

        return (
            <div className="week-calendar-j49 week-calendar">
                <div className="header-controls">

                    <button
                        className="btn-nav-style btn-left"
                        onClick={(e) => {
                            if (month === 1) {
                                state.onChange({
                                    month: 12,
                                    year: year - 1,
                                })
                            } else {
                                state.onChange({...state.value, month: month - 1});
                            }
                        }}
                    >
                        <i className="fa fa-arrow-left" />
                    </button>

                    {renderSelect({
                        list: createArray(12),
                        valueToLabel: (v) => v + 1,
                        isSelected: (v) => month === v + 1,
                        onChange: (v) => spc(state, ["month"], () => v + 1),
                    })}

                    {renderSelect({
                        list: fillRange(1930, 2025),
                        valueToLabel: (v) => v,
                        isSelected: (v) => year === v,
                        onChange: (v) => spc(state, ["year"], () => v),
                    })}

                    <button
                        className="btn-nav-style btn-right"
                        onClick={() => {
                            if (month === 12) {
                                state.onChange({
                                    month: 1,
                                    year: year + 1,
                                })
                            } else {
                                state.onChange({...state.value, month: month + 1});
                            }
                        }}
                    >
                        <i className="fa fa-arrow-right" />
                    </button>

                </div>

                <div className="week-picker-panel">
                    <div className="header-row">
                        {weekDays.map((wd) => (
                            <div key={wd}>
                                {wd}
                            </div>
                        ))}
                    </div>

                    {getMonthWeeks({month, year}).map((weekDays) => (
                        renderWeek(weekDays)
                    ))}

                </div>
            </div>
        );
    }
);
