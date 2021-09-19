import React from "react";
import {cs, provideContext} from "cs-react";
import {HashRouter as Router, Route, Switch} from 'react-router-dom';
import {createGuestApis} from "../../api/guest/create-guest-apis";
import {redirect} from "../common/redirect";
import {routerHistory} from "../common/router-history";
import {SignIn} from "./sign-in/sign-in";
import {loadRouting} from "../common/load-routing";

const guestRoutes = [
    {name: "Sign in", path: "/signin", component: SignIn},
];

export const GuestRoutes = () => cs(
    ["apis", (_, next) => next(createGuestApis())],
    ({apis}, next) => provideContext("apis", apis, next),

    (_, next) => loadRouting({
        paths: guestRoutes.map((r) => r.path),
        routerHistory,
        next,
    }),

    ({}) => {
        const defaultRoute = "/signin";
        return (
            <Router>
                <Switch>
                    {guestRoutes.map(({path, component}, i) => (
                        <Route
                            key={i}
                            exact
                            path={path}
                            component={component}
                        />
                    ))}

                    <Route render={redirect(defaultRoute)} />
                </Switch>
            </Router>
        )
    }
);
