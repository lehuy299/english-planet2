import React from "react";
import {cs, State} from "cs-react";
import "./search-class.scss";
import {bindInput} from "../../../../../../../common/react/bind-input";
import {scope} from "../../../../../../../common/react/scope";
import {consumeContext} from "cs-react";
import {DropdownSelectChips} from "../../../common/dropdown-select-chips/dropdown-select-chips";
import {weekDayLabels} from "../../../../../../../common/formats/formats";
import {stringListState} from "../../../common/data-logic/string-list-state";

export const SearchClass = ({onSearch}) => cs(
    consumeContext("resolve"),
    ["state", (_, next) => State({next})],
    ({state, resolve}) => {
        return (
            <div className="search-class-56s">
                <div className="flex-group">
                    <div className="form-group">
                        <div className="control-label">
                            Name
                        </div>
                        <input {...bindInput(scope(state, ["name"]))} />
                    </div>
                    <div className="form-group">
                        <div className="control-label">
                            Room
                        </div>
                        <input {...bindInput(scope(state, ["room"]))} />
                    </div>
                    <div className="form-group">
                        <div className="control-label">
                            Days of week
                        </div>
                        {DropdownSelectChips({
                            list: weekDayLabels.map((d, i) => ({label: d, value: i.toString()})),
                            valueToLabel: (d) => d.label,
                            ...(() => {
                                const {value, onChange} = stringListState(scope(state, ["days_of_week"]));
                                const isSelected = (d) => value?.includes(d.value);
                                return {
                                    isSelected,
                                    onSelect: (d) => onChange(
                                        isSelected(d) ? value.filter((d1) => d.value !== d1) : [...(value || []), d.value]
                                    ),
                                }
                            })()
                        })}
                    </div>
                    {/* <div className="form-group">
                        <div className="control-label">
                            Day of Birth
                        </div>
                        {rDateSelect({
                            list: createArray(31).map((_, i) => i + 1),
                            path: ["date_of_birth", "day"],
                        })}
                    </div>
                    <div className="form-group">
                        <div className="control-label">
                            Month of Birth
                        </div>
                        {rDateSelect({
                            list: createArray(12).map((_, i) => i + 1),
                            path: ["date_of_birth", "month"],
                        })}
                    </div>
                    <div className="form-group">
                        <div className="control-label">
                            Year of Birth
                        </div>
                        {rDateSelect({
                            list: createArray(20).map((_, i) => i + 2002),
                            path: ["date_of_birth", "year"],
                        })}
                    </div>
                    <div className="form-group">
                        <div className="control-label">
                            Class
                        </div>
                        {DropdownSelectChips({
                            list: resolve.classes,
                            valueToLabel: (c) => c.name,
                            ...(() => {
                                const isSelected = (c) => state.value?.class_ids?.includes(c.id);
                                return {
                                    isSelected,
                                    onSelect: (c) => spc(
                                        state, ["class_ids"], 
                                        (classIds) => isSelected(c) 
                                            ? classIds.filter((cId) => cId !== c.id) 
                                            : [...(classIds || []), c.id]
                                        )
                                }
                            })()
                            
                        })} 
                    </div>*/}
                    <div className="search-btn">
                        <button 
                            className="primary"
                            onClick={() => onSearch(state.value)}
                        >Search</button>
                    </div>
                </div>
            </div>
        )
    }
);
