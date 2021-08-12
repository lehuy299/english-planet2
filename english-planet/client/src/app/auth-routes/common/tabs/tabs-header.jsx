import {cx} from "emotion";
import React, {createElement as h} from "react";
import {Link} from "react-router-dom";
import "./tabs-header.scss";

export const TabsHeader = ({tabs}) => (
    <div className="tabs-header-r2j93">
        {tabs.map((tab, i) => tab && (
            h(tab.to ? Link : "div", {
                    className: cx("tab", {active: tab.active}),
                    key: i,
                    onClick: tab.onClick,
                    to: tab.to,
                },
                <i className={cx("icon", tab.label.icon)}/>,
                tab.label.text
            )
        ))}
    </div>
);
