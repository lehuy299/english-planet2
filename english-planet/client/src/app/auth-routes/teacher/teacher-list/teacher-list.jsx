import React from "react";
import {DataTable} from "../../../common/data-table/data-table";
import {cs, consumeContext} from "cs-react";
import {TeacherCommands} from "../teacher-commands";
import {serializeDate} from "../../../../../../../common/utils/date-object";

export const TeacherList = ({teachers, searchConditions}) => cs(
    consumeContext("resolve"),
    ["teacherCommands", ({}, next) => TeacherCommands({next})],
    ({teacherCommands, resolve}) => {
        const teacherList = (!searchConditions || Object.keys(searchConditions).length === 0) 
            ? teachers
            : applySearchConditions(teachers, searchConditions);

        return (
            <div className="teacher-list-3hs">
                <DataTable {...{
                    list: teacherList,
                    columns: [
                        {
                            label: "Name",
                            format: (v) => v.name,
                            sortValue: (v) => v.name.toLowerCase(),
                        },
                        {
                            label: "Phone",
                            format: (v) => v.phone_number,
                        },
                        {
                            label: "Email",
                            format: (v) => v.email,
                        },
                        {
                            label: "Address",
                            format: (v) => v.address,
                        },
                        {
                            format: (v) => teacherCommands.render({params: v}),
                            shy: true,
                        }
                    ],
                }} />
            </div>
        )
    }
);

const applySearchConditions = (list, conditions) => {
    console.log(123,list);
    const satisfiedString = (item, attr) => !conditions[attr] || item[attr].toLowerCase().includes(conditions[attr]?.toLowerCase());
    
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
        && satisfiedString(item, "phone_number")
        && satisfiedString(item, "email")
        && satisfiedString(item, "address")
    ));
};
