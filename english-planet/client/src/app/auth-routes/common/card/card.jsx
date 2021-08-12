import React from "react";
import {cs, State} from "cs-react";
import "./card.scss";
import {cx} from "emotion";

export const Card = ({title, renderContent, className}) => {
    return (
        <div className={cx("card-54g card", className)}>
            {title && (
                <div className="title">{title}</div>
            )}
            <div className="content">{renderContent()}</div>
        </div>
    );
};

export const CardExpandable = ({title, renderContent, className}) => cs(
    ["expand", (_, next) => State({next})],
    ({expand}) => {
        return (
            <div className={cx("card-expandable-5df card-expandable", {className}, {expanding: expand.value})}>
                <div 
                    className="toggle"
                    onClick={() => expand.onChange(!expand.value)} 
                >
                    {!expand.value ? (
                        <i className="fa fa-chevron-down" />
                    ) : (
                        <i className="fa fa-chevron-up" />
                    )}
                </div>
                <div className="title">{title}</div>
                {expand.value && (
                    <div className="content">{renderContent()}</div>
                )}
            </div>
        );
    }
)
