import React from 'react';
import {cs, consumeContext, keyed} from "cs-react";
import {rContextMenu} from '../../common/context-menu/context-menu';
import {AddClassDateModal} from './add-class-date-modal/add-class-date-modal';
import {generateClassDatesForADate} from './class-date-generator';

export const DateCommands = ({next}) => cs(
    consumeContext("apis"),
    consumeContext("cds"),
    consumeContext("resolve"),
    ["addClassDateModal", (_, next) => AddClassDateModal({next})],
    ({apis, cds, resolve, addClassDateModal}) => {
        return rContextMenu({
            getCommands: (date) => ([
                {
                    label: "Add Class Date",
                    onClick: () => addClassDateModal.show(date),
                },
                {
                    label: "Generate Class Dates",
                    onClick: async () => {
                        const newClassDates = await apis.classDate.createClassDates(
                            generateClassDatesForADate({date, classes: resolve.classes})
                        );
                        return cds.addClassDates(newClassDates);
                    }
                }
            ]),
            next,
        })
    }
);
