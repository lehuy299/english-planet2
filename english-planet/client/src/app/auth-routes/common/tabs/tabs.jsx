import {cs, State} from "cs-react";
import React from "react";
import {TabsHeader} from "./tabs-header";

export const Tabs = ({initTab, tabs}) => cs(
    ["selected", (_, next) => State({
        initValue: initTab || 0,
        next
    })],
    ({selected}) => (
        <div className="tabs-dj23g43">
            {TabsHeader({
                tabs: tabs.map((tab, i) => (tab.available || tab.available===undefined) && ({
                    label: tab.label,
                    active: selected.value === i,
                    onClick: () => selected.onChange(i),
                }))
            })}

            <div
                className="content"
                key={selected.value}
            >
                {tabs[selected.value].render({
                    onChangeTab: (index) => selected.onChange(index),
                })}
            </div>
        </div>
    ),
);
