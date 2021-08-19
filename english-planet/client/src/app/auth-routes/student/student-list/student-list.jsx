import React from "react";
import {DataTable} from "../../../common/data-table/data-table";
import {cs, consumeContext} from "cs-react";
import {StudentCommands} from "../student-commands";
import {serializeDate} from "../../../../../../../common/utils/date-object";

export const StudentList = ({students, searchConditions}) => cs(
    consumeContext("resolve"),
    ["studentCommands", ({}, next) => StudentCommands({next})],
    ({studentCommands, resolve}) => {
        const studentList = (!searchConditions || Object.keys(searchConditions).length === 0) 
            ? students
            : applySearchConditions(students, searchConditions);

        return (
            <div className="student-list-3hs">
                <DataTable {...{
                    list: studentList,
                    columns: [
                        {
                            label: "Name",
                            format: (v) => v.name,
                            sortValue: (v) => v.name.toLowerCase(),
                        },
                        {
                            label: "Classes",
                            format: (v) => v.class_ids?.map((cId) => resolve.getClass(cId).name).join(", "),
                        },
                        {
                            label: "Date of birth",
                            format: (v) => v.date_of_birth && serializeDate(v.date_of_birth),
                            sortValue: (v) => v.date_of_birth ? serializeDate(v.date_of_birth) : "",
                        },
                        {
                            label: "Phone",
                            format: (v) => v.phone_number,
                        },
                        {
                            label: "Address",
                            format: (v) => v.address,
                        },
                        {
                            format: (v) => studentCommands.render(v),
                            //shy: true,
                        }
                    ],
                }} />
            </div>
        )
    }
);

const applySearchConditions = (list, conditions) => {
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
        && satisfiedDate(item, "date_of_birth")
        && satisfiedArray(item, "class_ids")
    ));
};
