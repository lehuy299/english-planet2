import {cs, Invoke, State, StaticRef} from "cs-react";
import * as React from "react";
import "./dropdown-select-chips.scss";
import {cx} from "emotion";
import {Dropdown} from "../dropdown/dropdown";
import {bindInput} from "../../../../../../common/react/bind-input";
import {chain} from "../../../../../../common/utils/fs";
import {scope} from "../../../../../../common/react/scope";

export const DropdownSelectChips = ({className, list, isSelected, onSelect, hasError = {}, valueToLabel = (v) => v, domRef, searchable = true}) => cs(
    ["inputRef", (_, next) => StaticRef({next})],
    ["searching", (_, next) => State({next})],
    ({inputRef, searching}) => Dropdown({
        className: cx("dropdown-select-chips-0s9", className, hasError.value ? "has-error" : ""),
        renderToggle: ({showExpand, showingExpand}) => (
            <>
                {hasError.value && (
                    <i className="material-icons warning-icon" onClick={() => hasError.onClick()}>warning</i>
                )}

                <div
                    className={cx("toggle")}
                    onClick={() => inputRef.get().focus()}
                    ref={domRef}
                >
                    <div className="chips">
                        {list?.filter(isSelected).map((item, i) => (
                            <div className="chip" key={i}>
                                {valueToLabel(item)}

                                <i
                                    className="fa fa-times-circle"
                                    onMouseDown={(e) => {
                                        e.preventDefault();
                                        onSelect(item);
                                        // list.change((list) => list.filter((i1) => i1 !== item));
                                    }}
                                />
                            </div>
                        ))}
                    </div>



                    <input {...{
                        readOnly: !searchable,
                        ref: inputRef.set,
                        onFocus: () => searching.change((s) => s ?? {text: ""}),
                        onBlur: () => searching.onChange(null),
                        ...bindInput(scope(searching, ["text"])),
                    }}/>

                    <i className="fa fa-chevron-down"/>

                    {!showingExpand && searching.value && (
                        Invoke({action: () => showExpand()})
                    )}
                </div>
            </>
        ),
        renderExpand: ({width}) => (
            <div className="list" style={{minWidth: width}}>
                {chain(
                    list,
                    (_) => _?.filter((item) => searchList({search: searching.value?.text})(valueToLabel(item))),
                    (_) => _?.map((l, i) => (
                        <div
                            key={i}
                            className={cx("item", {selected: isSelected?.(l), focused: searching.value?.focusIndex === i})}
                            onMouseDown={() => {
                                onSelect(l);
                                // close();
                            }}
                        >
                            {valueToLabel(l)}
                        </div>
                    ))
                )}
            </div>
        ),
    }),
);


const searchList = ({search}) => (item) => !search ? true : item.toLowerCase().startsWith(search.toLowerCase());
