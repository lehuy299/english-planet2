import React from "react";
import {cs, State} from "cs-react";
import "./search-student.scss";
import {bindInput} from "../../../../../../../common/react/bind-input";
import {scope} from "../../../../../../../common/react/scope";
import {createArray} from "../../../../../../../common/utils/collections";
import {spc} from "../../../../../../../common/react/state-path-change";
import {getPath} from "../../../../../../../common/utils/arr-path";
import {DropdownSelect} from "../../../common/dropdown-select/dropdown-select";
import {consumeContext} from "cs-react";
import {DropdownSelectChips} from "../../../common/dropdown-select-chips/dropdown-select-chips";

export const SearchStudent = ({onSearch}) => cs(
    consumeContext("resolve"),
    ["state", (_, next) => State({next})],
    ({state, resolve}) => {
        const rDateSelect = ({list, path}) => DropdownSelect({
            list: ["All", ...list],
            isSelected: (v) => v === getPath(state.value, path),
            onChange: (v) => spc(state, path, () => v === "All" ? null : v),
        });

        return (
            <div className="search-student-56s">
                <div className="flex-group">
                    <div className="form-group">
                        <div className="control-label">
                            Name
                        </div>
                        <input {...bindInput(scope(state, ["name"]))} />
                    </div>
                    <div className="form-group">
                        <div className="control-label">
                            Phone Number
                        </div>
                        <input {...bindInput(scope(state, ["phone_number"]))} />
                    </div>
                    <div className="form-group">
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
                    </div>
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
