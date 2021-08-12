import * as React from "react";
import {cs, Invoke, State} from "cs-react";
import {GlobalKeyDown} from "../../../../../../common/react/keys/global-key-down";
import {waitTimeout} from "../../../../../../common/utils/wait-timeout";
import {IgnoreUpdate} from "../../../../../../common/react/ignore-update";

export const ModalServiceBase = ({render, initShow, strong, next}) => cs(
    ["state", (_, next) => State({next})],
    ({state}) => {
        const show = (args) => new Promise(async (resolve, reject) => {
            const hide = async () => {
                state.change((s) => ({...s, active: false}));
                await waitTimeout(300);
                state.onChange(null);
            };
            state.onChange({
                args,
                active: false,
                resolve: async (a) => {
                    await hide();
                    resolve(a);
                },
                reject: async (a) => {
                    await hide();
                    reject(a);
                },
            });
            await waitTimeout(10);
            state.change((s) => ({...s, active: true}));
        });

        return <>
            {cs(
                ({}, next) => IgnoreUpdate({next, when: () => state.value}),
                () => next({
                    show,
                }),
            )}

            {initShow && (
                Invoke({
                    action: show,
                })
            )}

            {state.value && <>
                {render(state.value)}

                {!strong && GlobalKeyDown({
                    keyCombo: "Escape",
                    onKeyDown: () => state.value.resolve(null),
                })}
            </>}
        </>;
    },
);
