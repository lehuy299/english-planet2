import React from "react";
import './App.scss';
import {loadAuth} from "./load-auth";
import {cs} from "cs-react";
import {GuestRoutes} from "./guest-routes/guest-routes";
import {AuthRoutes} from "./auth-routes/auth-routes";

export const App = () => cs(
    ["auth", (_, next) => loadAuth({next})],
    ({auth}) => {
        return (
            <div className='english-planet-app'>
                {!auth.user ? GuestRoutes() : AuthRoutes()}
            </div>
        )
    }
);
