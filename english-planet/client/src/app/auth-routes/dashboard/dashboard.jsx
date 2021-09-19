import React from 'react';
import {cs, consumeContext, State, Load, keyed} from "cs-react";
import {Card} from '../common/card/card';
import { Layout } from '../common/layout/layout';
import './dashboard.scss';
import {serializeDate, today2} from '../../../../../../common/utils/date-object';
import {DatePicker} from '../../common/date-picker/date-picker';
import {DataTable} from '../../common/data-table/data-table';
import {capitalize1, formatHour, formatNumberBig} from '../../../../../../common/formats/formats';
import {sort1} from '../../../../../../common/utils/collections';

export const Dashboard = () => cs(
    consumeContext("auth"),
    consumeContext("resolve"),
    (_, next) => <Layout {...{active: "dashboard"}}>{next()}</Layout>,
    ["currentDate", (_, next) => State({
        initValue: today2(),
        next,
    })],
    ({auth, currentDate, resolve}) => {
        const cards = [
            {
                title: "Happy Birthday!",
                render: HappyBirthday,
            },
            {
                title: "Today Classes",
                render: TodayClasses,
            },
            {
                title: "Unfinished Payment",
                render: UnfinishedPayment,
            },
            {
                title: "Figures",
                render: Figures,
            },
        ];

        return (
            <div className='dashboard-1j2'>
                <div className="title">Welcome, {auth.user.full_name}</div>
                <div className="controls">
                    {DatePicker({...currentDate})}
                </div>

                {cards.map((card, i) => cs(
                    keyed(i),
                    ({}) => Card({
                        title: card.title,
                        renderContent: () => card.render({date: currentDate.value}),
                    })
                ))}
            </div>
        )
    }
)

const HappyBirthday = ({date}) => cs(
    consumeContext("resolve"),
    ({resolve}) => {
        const studentsBornThisDay = resolve.students.filter((s) => s.date_of_birth?.day === date.day && s.date_of_birth?.month === date.month);
        return (
            <div className="">
                {DataTable({
                    list: studentsBornThisDay,
                    columns: [
                        {
                            label: "Name",
                            format: (s) => s.name
                        },
                        {
                            label: "Classes",
                            format: (s) => resolve.classes.filter((c) => s.class_ids?.includes(c.id)).map(c => c.name).join(", ")
                        },
                        {
                            label: "Date of birth",
                            format: (s) => serializeDate(s.date_of_birth),
                        },
                    ],
                })}
            </div>
        )
    }
)

const TodayClasses = ({date}) => cs(
    consumeContext("resolve"),
    consumeContext("apis"),
    ["classDates", ({apis}, next) => Load({
        _key: JSON.stringify(date),
        fetch: () => apis.classDate.getClassDatesInDateRange({from: date, to: date}),
        next,
    })],
    ({classDates, resolve}) => {
        return (
            <div className="">
                {DataTable({
                    list: sort1(classDates, (cd) => cd.time),
                    columns: [
                        {
                            label: "Class",
                            format: (cd) => resolve.getClass(cd.class_id).name
                        },
                        {
                            label: "Time",
                            format: (cd) => formatHour(cd.time)
                        },
                        {
                            label: "Room",
                            format: (cd) => cd.room
                        },
                    ],
                })}
            </div>
        )
    }
);

const UnfinishedPayment = ({}) => cs(
    consumeContext("resolve"),
    consumeContext("apis"),
    consumeContext("routing"),
    ["report", ({apis}, next) => Load({
        fetch: () => apis.student.getStudentsHavingUnfinishedPayment(),
        next,
    })],
    ({report, resolve, routing}) => {
        return (
            <div className="unfinished-payment-67g">
                {DataTable({
                    list: report,
                    columns: [
                        {
                            label: "Student",
                            format: (p) => (
                                <div 
                                    className="link"
                                    onClick={() => routing.goto("/enrollment", {query: {classId: p.class_id, studentId: p.student_id}})}
                                >
                                    {resolve.getStudent(p.student_id).name}
                                </div>
                            ),
                        },
                        {
                            label: "Class",
                            format: (p) => resolve.getClass(p.class_id).name,
                        },
                        {
                            label: "Status",
                            format: (p) => p.status.split("-").map((w) => capitalize1(w)).join(" "),
                        },
                        {
                            label: "Left",
                            format: (p) => formatNumberBig(p.left)
                        }
                    ],
                })}
            </div>
        )
    }
);

const Figures = ({}) => cs(
    consumeContext("resolve"),
    ({resolve}) => {
        const figures = [
            {
                label: "Number of Students",
                getValue: () => resolve.students.length,
            },
            {
                label: "Number of Classes",
                getValue: () => resolve.classes.length,
            },
            {
                label: "Number of Teachers",
                getValue: () => resolve.teachers.length,
            },
        ];

        return (
            <div className="">
                {DataTable({
                    list: figures,
                    columns: [
                        {
                            label: "Figure",
                            format: (f) => f.label
                        },
                        {
                            label: "Value",
                            format: (f) => f.getValue()
                        },
                    ],
                })}
            </div>
        )
    }
);

