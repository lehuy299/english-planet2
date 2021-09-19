import React from "react";
import {cs, provideContext, State} from "cs-react";
import {rLsStore} from "../../../../common/react/ls-store";

export const loadAuth = ({next}) => cs(
    ["state", rLsStore("auth")],
    ["auth", ({state}, next) => next({
        user: (state.value && state.value.token) ? state.value.user : null,
        token: (state.value && state.value.token) ? state.value.token : null,
        login: (auth) => state.onChange(auth),
        logout: () => state.onChange(null),
    })],
    ({auth}, next) => provideContext("auth", auth, next),
    ({auth}) => next(auth)
);
