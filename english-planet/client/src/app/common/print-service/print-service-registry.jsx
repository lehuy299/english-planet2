import ReactDOM from "react-dom";
import React, {createContext} from "react";
import {cx} from "emotion";
import {cs, StaticRef, State} from "cs-react";
import "./print-service-registry.scss";

export const PrintServiceRegistry = ({next}) => cs(
    ({}, next) => (
        <div className="print-service-registry-049">
            {next()}
        </div>
    ),
    ({}, next) => cs(
        ["domRef", ({}, next) => StaticRef({next})],
        ({domRef}) => <>
            <printContext.Provider
                value={(element) =>
                    ReactDOM.createPortal(element, domRef.get())
                }
            >
                {next()}
            </printContext.Provider>

            <div className="print" ref={domRef.set} />
        </>,
    ),
    ({}, next) => cs(
        ["domRef", ({}, next) => StaticRef({next})],
        ["show", (_, next) => State({next})],
        ({domRef, show}) => <>
            <printPreviewContext.Provider
                value={{
                    show: ({onDone}) => show.onChange({onDone}),
                    render: (element) =>
                        ReactDOM.createPortal(element, domRef.get())
                    ,
                }}
            >
                {next()}
            </printPreviewContext.Provider>

            <div
                className={cx("print-preview", {show: show.value})}
                onClick={() => {
                    show.value?.onDone?.();
                    show.onChange(null);
                }}
            >
                <div className="box" ref={domRef.set} onClick={(e) => e.stopPropagation()}/>
            </div>
        </>,
    ),
    () => (
        <div className="next">
            {next()}
        </div>
    ),
);

const printContext = createContext(null);
const printPreviewContext = createContext(null);

export const RenderPrintConsumer = printContext.Consumer;

export const PrintPreviewConsumer = printPreviewContext.Consumer;
