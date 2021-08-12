import {cx} from "emotion";
import React, {Fragment, createElement as h} from "react";
import {GlobalKeyDown} from "../../../../../../common/react/keys/global-key-down";
import {cs, State} from "cs-react";
import {findMaxE} from "../../../../../../common/utils/collections";
import {byPoint} from "../../../../../../common/utils/rectangles";
import "./side-modal.scss";

export const rSideModal = ({disabled, service, next}) => cs(
    ["show", (_, next) => State({next})],
    ({show}, next) => h(GlobalKeyDown, {
        keyCombo: "Escape",
        disabled: !show.value,
        onKeyDown: () => show.onChange(null),
        next,
    }),
    ["render", ({show}, next) => next(() => cs(
        ["service", (_, next) => service(show.value.params, () => show.onChange(null), next)],
        ({service: {content}}) => {
            const {rect} = show.value;

            let overlayDom;
            const distance = 40;

            const directions = {
                right: {
                    space: () => window.innerWidth - (rect.x + rect.width),
                    position: () => ({top: rect.y + rect.height/2, left: (rect.x + rect.width) + distance}),
                },
                left: {
                    space: () => rect.x,
                    position: () => ({top: rect.y + rect.height/2, right: (window.innerWidth - rect.x) + distance}),
                },
            };

            const direction = findMaxE(Object.keys(directions), (direction) => directions[direction].space());
            const onCancel = () => show.onChange(null);

            return (
                <div
                    className="side-modal-2eee"
                    onMouseDown={(e) => e.stopPropagation()}
                    onClick={(e) => e.target === overlayDom && onCancel()}
                    ref={ref => overlayDom = ref}
                    onKeyDown={(e) => {
                        if (e.key === "Escape") {
                            onCancel?.();
                        }
                        e.stopPropagation();
                    }}
                >
                    <div className={cx(
                        "fixed-box", direction,
                        rect.y < 200 && "downward",
                    )} style={directions[direction].position()}>
                        <div className="content">
                            {content}
                        </div>

                        <div className="arrow" />
                    </div>
                </div>
            );
        },
    ))],
    ({show, render}) => (
        <Fragment>
            {next({
                show: (e, params) => {
                    e.preventDefault();
                    e.stopPropagation();
                    if (disabled) {
                        return;
                    }
                    show.onChange({params, rect: byPoint({x: e.clientX, y: e.clientY})});
                },
            })}

            {show.value && (
                render()
            )}
        </Fragment>
    ),
);
