import React from "react";
import {Dropdown} from "../dropdown/dropdown";
import {cx} from "emotion";
import "./dropdown-select-search.scss";
import {cs, State} from "cs-react";
import {bindInput} from "../../../../../../common/react/bind-input";

export const DropdownSelectSearch = ({label, searchPlaceholder, list, valueToLabel = v=>v, valueToSearch, onChange, isSelected, isUnavailable = v => false, hasError, domRef, errorMessage, tabIndex}) => cs(
    ["search", (_, next) => State({next})],
    ({search}) => {
        const chosenIndex = list?.findIndex(isSelected);

        const renderToggle = ({showExpand, showingExpand}) => (
            <div
                className={cx("toggle", {expanding: showingExpand}, {"with-value": chosenIndex > -1})}
                onClick={() => showExpand(!showingExpand)}
            >

                {label && (
                    <div className="label">
                        {label}
                    </div>
                )}

                <span className="item-render">
                    {chosenIndex > -1 && valueToLabel(list[chosenIndex])}
                </span>

                <i className="fa fa-chevron-down"/>
            </div>
        );

        const renderExpand = ({close, width}) => (
            <>
                <div className="search">
                    <input {...{
                        ...bindInput(search),
                    }}/>
                </div>
                <div className="list" style={{minWidth: width}}>
                    {list?.map((l, i) => {
                        if (!search.value || valueToSearch(l)?.toLowerCase().replace(/ /g, "").includes(search.value.toLowerCase().replace(/ /g, ""))) {
                            return (
                                <div
                                    key={i}
                                    className={cx("item", {selected: chosenIndex === i, unavailable: isUnavailable(l)})}
                                    onClick={() => {
                                        onChange(l);
                                        search.onChange(null);
                                        close();
                                    }}
                                >
                                    {valueToLabel(l)}
                                </div>
                            );
                        }
                    })}
                </div>
            </>
        );

        return (
            <div
                className={cx("dropdown-select-search dropdown-select-search-rd3", {hasError})}
                ref={domRef}
                {...{tabIndex}}
            >
                {Dropdown({
                    renderToggle,
                    minExpandHeight: 300,
                    renderExpand,
                    forcedExpandLeft: true,
                    onPassiveClose: () => search.onChange(null),
                })}

                {hasError && errorMessage && (
                    <div className="error-message">
                        {errorMessage}
                    </div>
                )}
            </div>
        )
    }
)
