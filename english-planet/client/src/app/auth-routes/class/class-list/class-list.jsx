import React from "react";
import {DataTable} from "../../../common/data-table/data-table";
import {cs, consumeContext} from "cs-react";
import {ClassCommands} from "../class-commands";
import {serializeDate} from "../../../../../../../common/utils/date-object";
import {weekDayLabels} from "../../../../../../../common/formats/formats";

export const ClassList = ({classes, searchConditions}) => cs(
    ["classCommands", ({}, next) => ClassCommands({next})],
    consumeContext("resolve"),
    ({classCommands, resolve}) => {
        const classList = (!searchConditions || Object.keys(searchConditions).length === 0)
            ? classes
            : applySearchConditions(classes, searchConditions);
        return (
            <div className="class-list-3hs">
                <DataTable {...{
                    list: classList,
                    columns: [
                        {
                            label: "Name",
                            format: (v) => v.name,
                            sortValue: (v) => v.name.toLowerCase(),
                        },
                        {
                            label: "Room",
                            format: (v) => v.room,
                        },
                        {
                            label: "Teacher",
                            format: (v) => resolve.getTeacher(v.teacher_id)?.name,
                        },
                        {
                            label: "Fee",
                            format: (v) => v.fee,
                            sortValue: (v) => v.fee
                        },
                        {
                            label: "Date of week",
                            format: (v) => formatDaysOfWeek(v.days_of_week),
                        },
                        {
                            label: "Date start",
                            format: (v) => v.date_start && serializeDate(v.date_start),
                            sortValue: (v) => v.date_start ? serializeDate(v.date_start) : "",
                        },
                        {
                            label: "Date end",
                            format: (v) => v.date_end && serializeDate(v.date_end),
                            sortValue: (v) => v.date_end ? serializeDate(v.date_end) : "",
                        },
                        {
                            format: (v) => classCommands.render(v),
                            // shy: true,
                        }
                    ],
                }} />
            </div>
        )
    }
);

const formatDaysOfWeek = (v) => {
    return v?.split(",").map((i) => Number(i)).sort().map((i) => weekDayLabels[i]).join(", ");
};

const applySearchConditions = (list, conditions) => {
    const satisfiedString = (item, attr) => !conditions[attr] || item[attr].toLowerCase().includes(conditions[attr]?.toLowerCase());
    
    const satisfiedStringList = (item, attr) => {
        if (!conditions[attr]) {
            return true;
        }
        const itemValueArr = item[attr].toLowerCase().split(",");
        const conditionArr = conditions[attr]?.toLowerCase().split(",");
        for (const x of conditionArr) {
            if (itemValueArr.includes(x)) {
                return true;
            }
        }
        return false;
    };
    
    const satisfiedDate = (item, attr) => {
        const isSatisfied = (prop) => !conditions[attr]?.[prop] || item[attr][prop] === conditions[attr][prop];
        return isSatisfied("day") && isSatisfied("month") && isSatisfied("year");
    };

    const satisfiedArray = (item, attr) => {
        if (!conditions[attr]?.length > 0) {
            return true;
        }
        return item[attr]?.length > 0 && item[attr].every((cId) => conditions[attr]?.includes(cId))
    };

    return list.filter((item) => (
        satisfiedString(item, "name") 
        && satisfiedString(item, "room")
        && satisfiedStringList(item, "days_of_week")
    ));
};
