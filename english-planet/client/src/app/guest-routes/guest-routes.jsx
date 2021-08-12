import React from "react";
import {HashRouter as Router, Route, Switch} from 'react-router-dom';
import {redirect} from "../common/redirect";
import {SignIn} from "./sign-in/sign-in";

const guestRoutes = [
    {name: "Sign in", path: "/signin", component: SignIn},
];

export const GuestRoutes = () => {
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
};
