import React from 'react';
import {Layout} from "../common/layout/layout";
import {cs, consumeContext, Load, Load2, State} from 'cs-react';
import "./attendance.scss";
import {Card} from '../common/card/card';
import {ClassDatesAttendance} from './class-dates-attendance';
import {DropdownSelectSearch} from '../../common/dropdown-select/dropdown-select-search';
import {spc} from '../../../../../../common/react/state-path-change';

export const Attendance = () => cs(
    consumeContext("routing"),
    consumeContext("resolve"),
    consumeContext("apis"),
    ["current", ({routing}, next) => State({
        initValue: routing.getQuery(),
        next,
    })],
    ["enrollments", ({current, apis}, next) => Load({
        _key: JSON.stringify(current.value),
        fetch: () => current.value?.classId && apis.enrollment.getEnrollments({classId: current.value.classId}),
        next,
    })],
    ["classDates", ({current, apis}, next) => Load2({
        _key: JSON.stringify(current.value),
        fetch: () => current.value?.classId && apis.classDate.getClassDatesOfClass(current.value.classId),
        next,
    })],
    (_, next) => <Layout {...{active: "attendance"}}>{next()}</Layout>,
    ({classDates, enrollments, resolve, current}) => {
        return (
            <div className="attendance-5y3">
                <div className="title">Attendance</div>

                {Card({
                    renderContent: () => (
                        <div className="flex-group">
                            <div className="form-group">
                                <div className="control-label">Class</div>
                                {DropdownSelectSearch({
                                    list: resolve.classes,
                                    isSelected: (c) => current.value?.classId === c.id,
                                    onChange: (c) => spc(current, ["classId"], () => c.id),
                                    valueToLabel: (c) => c.name,
                                    valueToSearch: (c) => c.name,
                                })}
                            </div>
                        </div>
                    ),
                    className: "search-panel",
                })}

                {Card({
                    title: "Class dates",
                    className: "class-dates-attendance-panel",
                    renderContent: () => {
                        if (!current.value?.classId) {
                            return "Please choose a class.";
                        }
                        if (classDates.loading) {
                            return "Loading...";
                        }
                        if (!classDates.value?.length) {
                            return "There are not any class dates."
                        }
                        return ClassDatesAttendance({classDates, enrollments})
                    } 
                })}
            </div>
        )
    }
);
