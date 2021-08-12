import {cs} from "cs-react";
import * as React from "react";
import "./modal.scss";
import {cx} from "emotion";

export const Modal = ({title, width, content, resolve, strong, active, className, customizeDialog, customCloseIcon}) => cs(
    ({}) => (
        <div className={cx("modal-4dj", className, {active})} onClick={() => !strong && resolve(null)}>
            <div className="vertical-align-box">
                <div className="box" style={{width}} onClick={(e) => e.stopPropagation()}>
                    {!customizeDialog ? (
                        <>
                            <div className="header">
                                {title}

                                {!strong && (
                                    <div className="close" onClick={() => resolve(null)}>
                                        x
                                    </div>
                                )}
                            </div>
                            <div className="main">
                                {content}
                            </div>
                        </>
                    ) : content}
                </div>
            </div>
        </div>
    )
);
