import {cs, State} from "cs-react";
import React from "react";
import {PrintPreviewConsumer, RenderPrintConsumer} from "./print-service-registry";
import {cache0} from "../../../../../../common/utils/cache0";
import {waitTimeout} from "../../../../../../common/utils/wait-timeout";

export const PrintService = ({next, print = v=>v}) => cs(
    ["print", (_, next) => Print({next, print})],
    ["printPreview", (_, next) => PrintPreview({next, print})],
    next,
);

const addStyleDomOnce = cache0(() => {
    const styleDom = document.createElement('style');
    styleDom.setAttribute("type", "text/css");

    // console.log("Added");
    document.body.appendChild(styleDom);
    return styleDom;
});

const Print = ({next, print}) => cs(
    ["printing", (_, next) => State({next})],
    ({printing}) => <>
        {next((params, options) => {
            const windowPrint = async () => {
                window.print();
                printing.onChange(null);
            };
            printing.onChange(
                {
                    params,
                },
                async () => {
                    await waitTimeout(500);
                    if (options?.printSize) {
                        const styleDom = addStyleDomOnce();
                        styleDom.innerHTML = `@media print {@page {size: ${options.printSize};}}`;
                        await windowPrint();

                        await waitTimeout(500);
                        styleDom.innerHTML = "";
                    } else {
                        await windowPrint();
                    }
                },
            );
        })}

        {printing.value && cs(
            ["renderPrintingPortal", (_, next) => (
                <RenderPrintConsumer>
                    {next}
                </RenderPrintConsumer>
            )],
            ({renderPrintingPortal}) => (
                renderPrintingPortal(print(printing.value.params))
            )
        )}
    </>
);

const PrintPreview = ({next, print}) => cs(
    ["printing", (_, next) => State({next})],
    ["printPreview", (_, next) => <PrintPreviewConsumer>
        {next}
    </PrintPreviewConsumer>],
    ({printing, printPreview}) => <>
        {next((params) => {
            printing.onChange({params});

            printPreview.show({
                onDone: () => printing.onChange(null),
            });
        })}

        {printing.value && (
            printPreview.render(print(printing.value.params))
        )}
    </>
);
