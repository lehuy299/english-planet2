import React, {createElement as h} from "react";
import {cs, State} from "cs-react";
import "./popup-menu.scss";
import {GlobalKeyDown} from "../../../../../../common/react/keys/global-key-down";

export const PopupMenu = ({next, getCommands, minWidth}) => cs(
    ["show", (_, next) => h(State, {next})],
    ({show}) => <>
        {next({
            render: ({params, img}={}) => <>
                {(() => {
                    let dom;
                    let commands = getCommands(params);
                    return (commands || []).length > 0 && (
                        <div
                            ref={(r) => dom = r}
                            className="popup-menu-toggle-1ws"
                            onClick={() => {
                                const {bottom, right, top, height} = dom.getBoundingClientRect();
                                const wh = window.innerHeight;
                                const isEndOfPage = wh - bottom - 28 * commands.length < 0;

                                show.onChange({bottom: isEndOfPage ? top - 34 * commands.length - height : bottom, right: window.innerWidth - right, params});
                            }}
                        >
                            {img ?? (
                                <img src={require("./ellipsis-v-icon.svg")} alt=""/>
                            )}
                        </div>
                    );
                })()}

                {show.value && cs(
                    ({}, next) => h(GlobalKeyDown, {
                        keyCombo: "Escape",
                        onKeyDown: () => show.onChange(null),
                        next
                    }),
                    ({}) => {
                        let overlayDom;

                        return (
                            <div
                                className="popup-menu-overlay-49c"
                                onClick={(e) => e.target === overlayDom && show.onChange(null)}
                                ref={ref => overlayDom = ref}
                            >
                                <div
                                    className="popup-menu-commands"
                                    style={{
                                        top: show.value.bottom,
                                        right: show.value.right,
                                        minWidth
                                    }}
                                >
                                    {getCommands(show.value.params).map((cm, i) => (
                                        <div
                                            key={i}
                                            className="command"
                                            onClick={() => {
                                                cm.onClick();
                                                show.onChange(null);
                                            }}
                                        >
                                            {cm.label}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    },
                )}
            </>
        })}
    </>,
);
