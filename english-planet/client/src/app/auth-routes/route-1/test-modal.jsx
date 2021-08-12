import React from "react";
import {ModalService} from "../../common/modal/modal-service";
import {cs} from "cs-react";

export const TestModal = ({next: rootNext}) => cs(
    ["modal", ({}, next) => ModalService({
        render: ({resolve}) => ({
            title: "Test Modal",
            width: 500,
            content: next({
                resolve,
            }),
        }),
        next: rootNext,
    })],
    ({modal}) => (
        <div className="test-modal">
            <div className="dialog-body">
                test modal
            </div>

            <div className="buttons">
                <button onClick={() => modal.resolve("discard")}>Discard</button>
                <button className="primary" onClick={() => modal.resolve("save")}>Save</button>
            </div>
        </div>
    )
);
