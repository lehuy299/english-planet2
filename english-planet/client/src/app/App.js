import React from "react";
import './App.scss';
import {Auth} from "./auth";
import {cs, provideContext} from "cs-react";
import {createApis} from "../api/create-apis";
import {GuestRoutes} from "./guest-routes/guest-routes";
import {AuthRoutes} from "./auth-routes/auth-routes";
import {createMockApis} from "../api/mock-apis/create-mock-apis";
import {isDev} from "../api/is-dev";

export const App = () => cs(
  ["auth", (_, next) => Auth({next})],
  ["apis", ({auth}, next) => next(createApis({auth}))],
  // ["apis", ({auth}, next) => next(createMockApis({auth}))],
  ({auth}, next) => provideContext("auth", auth, next),
  ({apis}, next) => provideContext("apis", apis, next),
  ({auth}) => {
      return (
          <div className='english-planet-app'>
            {!auth.user ? GuestRoutes() : AuthRoutes()}
          </div>
      )
  }
);
