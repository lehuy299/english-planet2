import React from 'react'
import "./layout.scss";
import {cx} from "emotion";
import {cs, consumeContext} from 'cs-react';

export const Layout = ({active, children}) => cs(
    consumeContext("auth"),
    consumeContext("routing"),
    ({auth, routing}) => {
        const navLinks = getNavLinks(auth.user);
        return (
            <div className="dashboard-layout-4dg">
                <div className="header">
                    <div className="logo">English Planet</div>
                    <div className="actions">
                        <div className="logout" onClick={() => auth.logout()}>
                            Logout {auth.user?.full_name}
                        </div>
                    </div>
                </div>
                <div className="content">
                    <div className="left-panel">
                        <div className="links">
                            {navLinks.map((l, i) => (
                                <div
                                    className={cx("link", {active: active === l.active})}
                                    key={i}
                                    onClick={() => routing.goto(l.to)}
                                >
                                    {l.name}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="main-panel">{children}</div>
                </div>
            </div>
        )
    }
);

const getNavLinks = (user) => [
    {
        name: "Dashboard",
        active: "dashboard",
        to: "/dashboard",
    },
    {
        name: "Students",
        active: "student",
        to: "/student",
    },
    {
        name: "Enrollments",
        active: "enrollment",
        to: "/enrollment",
    },
    {
        name: "Teachers",
        active: "teacher",
        to: "/teacher",
    },
    {
        name: "Classes",
        active: "class",
        to: "/class",
    },
    {
        name: "Attendance",
        active: "attendance",
        to: "/attendance",
    },
    {
        name: "Timetable",
        active: "timetable",
        to: "/timetable",
    },
    user.role === "admin" && {
        name: "Setting",
        active: "setting",
        to: "/setting",
    }
].filter(v => v);

 