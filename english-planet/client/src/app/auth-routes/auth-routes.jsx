import React from "react";
import {HashRouter as Router, Route, Switch} from 'react-router-dom';
import {redirect} from "../common/redirect";
import {Class} from "./class/class";
import {Dashboard} from "./dashboard/dashboard";
import {Setting} from "./setting/setting";
import {StaticResolve} from "./static-resolve";
import {Student} from "./student/student";
import {Teacher} from "./teacher/teacher";
import {Timetable} from "./timetable/timetable";
import {cs, provideContext, consumeContext} from "cs-react";
import {Enrollment} from "./enrollment/enrollment";
import {routerHistory} from "../common/router-history";
import {loadRouting} from "../common/load-routing";
import {PrintServiceRegistry} from "../common/print-service/print-service-registry";
import {Attendance} from "./attendance/attendance";
import {createAuthApis} from "../../api/auth/create-auth-apis";

const authRoutes = [
    {name: "Main dashboard", path: "/dashboard",  component: Dashboard},
    {name: "Student",        path: "/student",    component: Student},
    {name: "Enrollment",     path: "/enrollment", component: Enrollment},
    {name: "Teacher",        path: "/teacher",    component: Teacher},
    {name: "Class",          path: "/class",      component: Class},
    {name: "Attendance",     path: "/attendance", component: Attendance},
    {name: "Timetable",      path: "/timetable",  component: Timetable},
    {name: "Setting",        path: "/setting",    component: Setting},
];

export const AuthRoutes = () => cs(
    consumeContext("auth"),
    ["apis", ({auth}, next) => next(createAuthApis({
        token: auth.token,
        onUnauthenticated: () => auth.logout(),
    }))],
    ({apis}, next) => provideContext("apis", apis, next),

    (_, next) => loadRouting({
        paths: authRoutes.map((r) => r.path),
        routerHistory,
        next,
    }),

    (_, next) => loadResolve({next}),

    ({}, next) => PrintServiceRegistry({next}),

    ({}) => {
        const defaultRoute = "/dashboard";
        return (
            <Router>
                <Switch>
                    {authRoutes.map(({path, component}, i) => (
                        <Route
                            key={i}
                            exact
                            path={path}
                            history={routerHistory}
                            component={component}
                        />
                    ))}

                    <Route render={redirect(defaultRoute)} />
                </Switch>
            </Router>
        )
    }
)

const loadResolve = ({next}) => cs(
    ["resolve", (_, next) => StaticResolve({next})],
    ({resolve}, next) => resolve.loading ? (
        "Loading data..."
    ) : (
        next()
    ),
    ({resolve}) => provideContext("resolve", resolve, next),
    ({resolve}) => next(resolve),
);
