import React from "react";
import {consumeContext, cs, State} from "cs-react";
import {Tabs} from "../../common/tabs/tabs";
import {EnrollmentInfo} from "./enrollment-info";
import {Receipts} from "../receipts/receipts";

export const EnrollmentPanel = ({enrollment: oriErm}) => cs(
    consumeContext("apis"),
    ["enrollment", (_, next) => State({
        initValue: oriErm.value,
        next,
    })],
    ({enrollment, apis}) => {
        return (
            <div className="enrollment-panel-4g2">
                <div className="panel-tabs">
                    <Tabs {...{
                        tabs: [
                            {
                                label: {text: "Information"},
                                render: () => EnrollmentInfo({
                                    enrollment,
                                    oriErm,
                                }),
                            },
                            {
                                label: {text: "Receipts"},
                                render: () => Receipts({enrollment}),
                            },
                        ],
                    }} />
                </div>
            </div>
        )
    }
);
