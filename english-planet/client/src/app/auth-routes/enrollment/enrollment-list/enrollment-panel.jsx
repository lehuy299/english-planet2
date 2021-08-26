import React from "react";
import {consumeContext, cs, State, Load2} from "cs-react";
import {Tabs} from "../../common/tabs/tabs";
import {EnrollmentInfo} from "./enrollment-info";
import {Receipts} from "../receipts/receipts";

export const EnrollmentPanel = ({enrollment: oriErm, onDelete}) => cs(
    consumeContext("apis"),
    ["enrollment", (_, next) => State({
        initValue: oriErm.value,
        next,
    })],
    ["receipts", ({apis}, next) => Load2({
        fetch: () => apis.enrollment.getReceipts(oriErm.value?.id),
        next,
    })],
    ({enrollment, receipts, apis}) => {
        return (
            <div className="enrollment-panel-4g2">
                <div className="panel-tabs">
                    <Tabs {...{
                        tabs: [
                            {
                                label: {text: "Information"},
                                render: () => !receipts.value ? "Loading..." : EnrollmentInfo({
                                    enrollment,
                                    oriErm,
                                    receipts,
                                    onDelete,
                                }),
                            },
                            {
                                label: {text: "Receipts"},
                                render: () => Receipts({enrollment, receipts}),
                            },
                        ],
                    }} />
                </div>
            </div>
        )
    }
);
