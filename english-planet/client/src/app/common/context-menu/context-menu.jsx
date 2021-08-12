import React from "react";
import {rSideModal} from "../side-modal/side-modal";
import {rCommands} from "./commands/commands";

export const rContextMenu = ({disabled, getCommands, next}) => rSideModal({
    disabled,
    service: (params, rm, next) => next({
        content: rCommands({
            commands: getCommands(params),
            // header:
            rm,
        }),
        // rect:
    }),
    next,
});

