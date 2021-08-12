import {cx} from "emotion";
import React, {createElement as h} from "react";

import "./dropdown.scss";
import {cs, State} from "cs-react";
import {ExpandPosition} from "./expand-position";
import {AnyAction2} from "../../../../../../common/react/any-action-2";
import {Static2} from "../../../../../../common/react/static-2";
import {GlobalEvent} from "../../../../../../common/react/global-event";

export const Dropdown = ({
     renderExpand, renderToggle, className,
     minExpandHeight, expandDistance = 0, forcedExpandLeft, forcedExpandBottom,
     onPassiveClose, disabled, dropdownRef, minWidth, useTogglePosition = false, detectOnWheelEvent = false,
}) => cs(
    ["expanded", (_, next) => State({
        initValue: false,
        next
    })],
    ["domRef", (_, next) => Static2({next})],
    ({expanded, domRef}, next) => AnyAction2({
        disabled: !expanded.value,
        getDom: domRef.get,
        fn: () => {
            expanded.onChange(false);
            onPassiveClose?.();
        },
        next,
    }),
    ({expanded, domRef}) => {
        const showExpand = (show) => {
            if (disabled) return;

            show = show === undefined ? !expanded.value : show;

            if (show !== expanded.value) {
                setTimeout(() => {
                    expanded.onChange(show);
                }, 0);
            }
        };

        dropdownRef?.set({
            showExpand
        });

        return (
            <div
                className={cx("dropdown dropdown-jd2389", className, { disabled })}
                ref={(r) => domRef.set(r)}
            >
                {/*{isDev() && (*/}
                {/*    Invoke({*/}
                {/*        action: async () => {*/}
                {/*            await waitTimeout(500);*/}
                {/*            expanded.onChange(true);*/}
                {/*        },*/}
                {/*    })*/}
                {/*)}*/}
                {renderToggle({
                    showExpand,
                    showingExpand: expanded.value,
                })}
                {expanded.value && cs(
                    ["expandPosition", (_, next) => ExpandPosition({
                        dom: useTogglePosition ? domRef.get().firstChild : domRef.get(),
                        forcedLeft: forcedExpandLeft,
                        forcedBottom: forcedExpandBottom,
                        minHeight: minExpandHeight + (expandDistance ?? 0),
                        next,
                    })],
                    ({expandPosition}) => (
                        <div
                            className={cx("expand")}
                            style={{
                                ...expandPosition.top ? {
                                    top: expandPosition.top + (expandDistance ?? 0),
                                } : {
                                    bottom: expandPosition.bottom + (expandDistance ?? 0),
                                },
                                ...expandPosition.left ? {
                                    left: expandPosition.left,
                                } : {
                                    right: expandPosition.right,
                                },
                                maxHeight: expandPosition.maxHeight,
                                overflow: expandPosition.maxHeight ? "auto" : "",
                                minWidth
                            }}
                        >
                            {renderExpand({
                                close: () => expanded.onChange(false),
                                ...expandPosition,
                            })}


                            {GlobalEvent({
                                eventName: "scroll",
                                fn: () => {
                                    expanded.onChange(false);
                                },
                            })}

                            {detectOnWheelEvent && GlobalEvent({
                                eventName: "wheel",
                                fn: () => {
                                    expanded.onChange(false);
                                },
                            })}
                        </div>
                    ),
                )}
            </div>
        );
    }
);
