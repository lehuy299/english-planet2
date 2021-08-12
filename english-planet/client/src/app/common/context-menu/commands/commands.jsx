import React from "react";
import {cx} from "emotion";
import {isEmpty} from "../../../../../../../common/utils/collections";
import {renderSelect} from "../../dropdown-select/select";
import "./commands.scss";

export const rCommands = ({commands, header, rm}) => (
    <div className="commands-sdk9">
        {header && (
            <div className="header">
                {header}
            </div>
        )}
        {isEmpty(commands) && (
            <div className="">
                Không thể thực hiện hành động nào
            </div>
        )}
        {commands?.map((c, i) =>
            c.list ? (
                renderSelect({
                    key: i,
                    ...c,
                    placeholder: c.label,
                    onChange: (value) => {
                        rm();
                        c.onChange(value);
                    },
                })
            ) : (
                <button
                    key={i}
                    className={cx(c.color)}
                    onClick={(e) => {
                        c.onClick(e);
                        rm();
                    }}
                >{c.label}</button>
            )

        )}
    </div>
);
