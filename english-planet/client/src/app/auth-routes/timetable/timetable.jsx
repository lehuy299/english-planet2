import React from 'react';
import {cs, consumeContext, State, provideContext, Load2} from "cs-react";
import {getWeekRange, today2} from '../../../../../../common/utils/date-object';
import { Layout } from '../common/layout/layout';
import './timetable.scss';
import {WeekTable} from './week-table';
import {Card} from '../common/card/card';
import {FormatClassDates} from './class-date-card/format-class-dates';
import {replaceFind} from '../../../../../../common/utils/collections';
import {DateCommands} from './date-commands';
import {AddClassDateModal} from './add-class-date-modal/add-class-date-modal';

export const Timetable = () => cs(
    consumeContext("resolve"),
    consumeContext("apis"),
    ["dateRange", (_, next) => State({
        initValue: getWeekRange(today2()),
        next,
    })],
    ["classDates", ({dateRange, apis}, next) => Load2({
        _key: JSON.stringify(dateRange.value),
        fetch: () => apis.classDate.getClassDatesInDateRange(dateRange.value),
        next,
    })],
    ["cds", ({classDates}, next) => ClassDatesServices({classDates, next})],
    ["formatClassDates", ({}, next) => FormatClassDates({next})],
    // ["dateCommands", (_, next) => DateCommands({next})],
    ["addClassDateModal", (_, next) => AddClassDateModal({next})],
    (_, next) => <Layout {...{active: "timetable"}}>{next()}</Layout>,
    ({resolve, apis, dateRange, classDates, formatClassDates, cds, dateCommands, addClassDateModal}) => {
        return (
            <div className="timetable-2l5">
                <div className="title">Timetable</div>

                <div className="controls">
                    <button
                        className="primary"
                        onClick={() => addClassDateModal.show()}
                    >Add Class Date</button>
                </div>

                {Card({
                    renderContent: () => WeekTable({
                        dateRange,
                        cards: classDates.value?.map(formatClassDates),
                        // onDateContextMenu: (e, date) => dateCommands.show(e, date),
                    }),
                    className: "timetable-panel",
                })}
            </div>
        )
    }
);

const ClassDatesServices = ({classDates, next}) => cs(
    ["cds", (_, next) => next({
        addClassDate: (newClassDate) => classDates.onChange([...(classDates.value || []), newClassDate]),
        addClassDates: (newClassDates) => classDates.onChange([...(classDates.value || []), ...newClassDates]),
        updateClassDate: (updated) => classDates.onChange(replaceFind(classDates.value, updated, (cd) => cd.id === updated.id)),
        deleteClassDate: (id) => classDates.onChange(classDates.value.filter((cd) => cd.id !== id)),
    })],
    ({cds}, next) => provideContext("cds", cds, next),
    ({cds}) => next(cds)
);
