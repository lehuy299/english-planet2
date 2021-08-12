import React from "react";
import {cs, State} from "cs-react";
import "./search-teacher.scss";
import {bindInput} from "../../../../../../../common/react/bind-input";
import {scope} from "../../../../../../../common/react/scope";
import {createArray} from "../../../../../../../common/utils/collections";
import {spc} from "../../../../../../../common/react/state-path-change";
import {getPath} from "../../../../../../../common/utils/arr-path";
import {DropdownSelect} from "../../../common/dropdown-select/dropdown-select";
import {consumeContext} from "cs-react";
import {DropdownSelectChips} from "../../../common/dropdown-select-chips/dropdown-select-chips";

export const SearchTeacher = ({onSearch}) => cs(
    consumeContext("resolve"),
    ["state", (_, next) => State({next})],
    ({state, resolve}) => {
        const rDateSelect = ({list, path}) => DropdownSelect({
            list: ["All", ...list],
            isSelected: (v) => v === getPath(state.value, path),
            onChange: (v) => spc(state, path, () => v === "All" ? null : v),
        });

        return (
            <div className="search-teacher-56s">
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
                            Email
                        </div>
                        <input {...bindInput(scope(state, ["email"]))} />
                    </div>
                    <div className="form-group">
                        <div className="control-label">
                            Address
                        </div>
                        <input {...bindInput(scope(state, ["address"]))} />
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
