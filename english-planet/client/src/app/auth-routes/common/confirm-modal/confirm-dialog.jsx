import React from "react";
import {cs} from "../../../../../common/react/chain-services";
import {DialogService} from "../dialog/dialog-service";
import "./confirm-dialog.scss";
import {UseState} from "../../../../../common/react/use-state";

export const ConfirmDialog = ({next: rootNext, title, body, submitText = "Confirm", cancelText = "Cancel"}) => cs(
    ["modal", (_, next) => DialogService({
        render: ({resolve, args: {description, confirmClick, confirmTitle, submitBtn} = {}}) => ({
            title: confirmTitle || title,
            width: 480,
            content: next({
                resolve,
                description,
                confirmClick,
                submitBtn
            }),
            initShow: true,
            className: "confirm-dialog-wrapper-z33"
        }),
        next: rootNext,
    })],
    ["disabled", (_, next) => UseState({next})],
    ({modal, disabled}) => cs(
        () => (
            <div className="confirm-dialog-z33">
                <div className="dialog-body">
                    <div className="message">
                        {body ? body : modal.description}
                    </div>
                </div>

                <div className="buttons">
                    <button onClick={() => {modal.resolve()}}>{cancelText}</button>
                    <button
                        disabled={disabled.value}
                        className="primary"
                            onClick={async () => {
                                if (modal.confirmClick) {
                                    disabled.onChange(true);
                                    await modal.confirmClick();
                                    modal.resolve(true);
                                } else {
                                    modal.resolve(true);
                                }
                            }}>{modal.submitBtn || submitText}</button>
                </div>
            </div>
        )
    )
);
