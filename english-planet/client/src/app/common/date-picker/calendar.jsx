import {cx} from "emotion";
import React from "react";
import {FComponent} from "../../../../../../common/react/f-component";
import {createArray} from "../../../../../../common/utils/collections";
import {getMonthWeeks, parseDate, sameDate} from "../../../../../../common/utils/date-object";
import {omit} from "../../../../../../common/utils/objects";
import {renderSelect} from "../dropdown-select/select";
import "./calendar.scss";


export class Calendar extends FComponent {
    constructor(props, context) {
        super(props, context);

        this.state = {
            month: props.selectedDate ? props.selectedDate.month : new Date().getMonth() + 1,
            year : props.selectedDate ? props.selectedDate.year  : new Date().getFullYear(),
        };
    }

    render() {
        const {month, year} = this.state;
        const {className, selectedDate, onChange} = this.props;

        const renderWeek = (weekDays) => (
            <div
                className="date-row"
                key={`${weekDays[0].month}-${weekDays[0].day}`}
            >
                {weekDays.map((wd) => {
                    return (
                        <div
                            key={wd.day}
                            className={cx("day", {
                                today: sameDate(wd, parseDate(new Date())),
                                selected: selectedDate && wd.month === month && sameDate(wd, selectedDate),
                            })}
                            onMouseDown={() => {
                                if (wd.month === month) {
                                    return onChange(omit(wd, ["dow"]));
                                } else {
                                    this.setState({month: wd.month, year: wd.year});
                                }
                            } }
                        >
                            <label>{wd.month === month && wd.day}</label>
                        </div>
                    );
                })}
            </div>
        );

        return (
            <div className={cx(className, "calendar-j4938")}>
                <div className="header-controls">

                    <button
                        className="btn-nav-style btn-left"
                        onMouseDown={(e) => {
                            if (month === 1) {
                                this.setState({
                                    month: 12,
                                    year: year - 1,
                                })
                            } else {
                                this.setState({month: month - 1});
                            }
                            e.preventDefault();
                        }}
                    >
                        <i className="fa fa-arrow-left"/>
                    </button>

                    {renderSelect({
                        list: createArray(12),
                        valueToLabel: (v) => v+1,
                        isSelected: (v) => month === v+1,
                        onChange: (v) => this.setState({month: v+1})
                    })}

                    {renderSelect({
                        list: fillRange(1930, 2025),
                        valueToLabel: (v) => v,
                        isSelected: (v) => year === v,
                        onChange: (v) => this.setState({year: v})
                    })}

                    <button
                        className="btn-nav-style btn-right"
                        onMouseDown={(e) => {
                            if (month === 12) {
                                this.setState({
                                    month: 1,
                                    year: year + 1,
                                })
                            } else {
                                this.setState({month: month + 1})
                            }
                            e.preventDefault();
                        }}
                    >
                        <i className="fa fa-arrow-right"/>
                    </button>

                </div>

                <div className="date-picker-panel">
                    <div className="header-row">
                        {weekDays.map((wd) => (
                            <div key={wd}>
                                <label>
                                    {wd}
                                </label>
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
}

export const weekDays = [
    "Su",
    "Mo",
    "Tu",
    "We",
    "Th",
    "Fr",
    "Sa",
];

export const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
];

export const fillRange = (start, end) => {
    return Array(end - start + 1).fill(0).map((item, index) => start + index);
};

