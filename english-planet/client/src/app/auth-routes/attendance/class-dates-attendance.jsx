import React from 'react';
import {cs, consumeContext, Load2, State} from 'cs-react';
import {cx} from "emotion";
import "./class-dates-attendance.scss";
import {formatDate} from '../../../../../../common/formats/formats';
import {replaceFind} from '../../../../../../common/utils/collections';
import {AttendanceTable} from './attendance-table';

export const ClassDatesAttendance = ({classDates, enrollments}) => cs(
    consumeContext("routing"),
    ["selected", ({routing}, next) => State({
        initValue: routing.getQuery()?.classDateId || classDates.value[0]?.id,
        next,
    })],
    ({selected}) => {
        return (
            <div className="class-dates-attendance-4tg">
                <div className="left-menu">
                    {classDates.value?.map((cd, i) => {
                        return (
                            <div
                                key={cd.id}
                                className={cx("class-date", {selected: cd.id === selected.value})}
                                onClick={() => selected.onChange(cd.id)}
                            >
                                {formatDate(cd.date)}
                            </div>
                        );
                    })}
                </div>
                <div className="main-panel" key={selected.value}>
                    {/* <pre>{JSON.stringify(classDates.value.find((cd) => cd.id === selected.value))}</pre> */}
                    {AttendanceTable({
                        classDate: {
                            value: classDates.value.find((cd) => cd.id === selected.value),
                            onChange: (update) => classDates.onChange(replaceFind(classDates.value, update, (cd) => cd.id === update.id)),
                        },
                        enrollments,
                    })}
                </div>
            </div>
        )
    }
);
