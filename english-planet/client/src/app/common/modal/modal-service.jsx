import * as React from "react";
import {ModalServiceBase} from "./modal-service-base";
import {Modal} from "./modal";

export const ModalService = ({render, initShow, strong, className, next, customCloseIcon}) => ModalServiceBase({
    initShow,
    strong,
    render: ({args, resolve, reject, active}) => Modal({
        strong,
        active,
        resolve,
        className,
        customCloseIcon,
        ...render({args, resolve, reject, active}),
    }),
    next,
});
