import {cs, StaticRef} from "cs-react";
import {cx} from "emotion";
import {Dropdown} from "../dropdown/dropdown";
import React from "react";
import "./dropdown-select.scss";

export const DropdownSelect = ({label, list, valueToLabel = v => v, onChange, isSelected, placeholder, hasError, domRef, disabled, className, icon = null, tabIndex, info, directionTooltip = "right", errorMessage, detectOnWheelEvent = false}) => cs(
    ["chosenIndex", (_, next) => next(list?.findIndex(isSelected))],
    ["renderToggle", ({chosenIndex}, next) => next(({showExpand, showingExpand}) => (
        <div
            className={cx("toggle", {expanding: showingExpand})}
            onClick={() => showExpand(!showingExpand)}
        >

            {chosenIndex > - 1 ?
                <span className="item-render">
                    <div className="text">{valueToLabel(list[chosenIndex])}</div>
                </span>
                :
                <span className="placeholder-text">{placeholder}</span>
            }
            <i className="fa fa-chevron-down"/>
        </div>
    ))],
    ["renderExpand", ({chosenIndex}, next) => next(({close, width}) => (
        <div className="list" style={{minWidth: width}}>
            {list?.map((l, i) => (
                <div
                    key={i}
                    className={cx("item", {selected: chosenIndex === i, disabled: l?.disabled})}
                    onClick={() => {
                        onChange(l);
                        close();
                    }}
                >
                    {valueToLabel(l)}
                </div>
            ))}
        </div>
    ))],
    ["dropdownRef", (_, next) => StaticRef({next})],
    ({renderToggle, renderExpand, dropdownRef}) => (
        <div
            className={cx("dropdown-select dropdown-select-5gy", className, {hasError}, {"has-info": info})}
            ref={domRef}
        >
            {label && (
                <div className="label">
                    {label}
                </div>
            )}
            {Dropdown({
                dropdownRef,
                renderToggle,
                minExpandHeight: 300,
                renderExpand,
                disabled,
                detectOnWheelEvent
            })}

            {hasError && errorMessage && (
                <div className="error-message">
                    {errorMessage}
                </div>
            )}
        </div>
    )
);
