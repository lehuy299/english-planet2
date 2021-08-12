import React, {createElement as h} from "react";
import {chain} from "../../../../../../common/utils/fs";
import {normalizeTinyNumber} from "../../../../../../common/utils/normalize-tiny-number";
import {cs, State} from "cs-react";
import "./data-table.scss";
import {reverse, sort} from "../../../../../../common/utils/collections";
import {cx} from "emotion";

export const DataTable = ({list, sorting, initSorting, columns, rowKey, className, rowClassName, onUpdateList, hideHeader = false}) => cs(
    ["sorting", (_, next) => sorting ? next(sorting) : h(State, {initValue: initSorting, next})],
    ({sorting}) => {
        const sortedList = onUpdateList ? list : applySorting(list, {sorting: sorting.value, columns});

        return (
            <table className={"data-table data-table-f24 " + (className || "")}>
                {!hideHeader && (
                    <thead>
                        <tr>
                            {columns?.map((column, i) => (
                                <th
                                    key={i}
                                    className={cx(column?.headClassName, {"align-right": column.alignRight, "align-center": column.alignCenter, }, (sorting.value?.columnIndex === i ? " sorting-active " : "") + (column.sortValue ? " sorting-enabled " : ""))}
                                    onClick={column.sortValue && (() => {
                                        const sortValue = sorting.value?.columnIndex !== i ?
                                            {columnIndex: i, asc: false} :
                                            {columnIndex: i, asc: !sorting.value.asc}
                                            ;
                                        sorting.onChange(sortValue);
                                        onUpdateList && onUpdateList(applySorting(list, {sorting: sortValue, columns}));
                                    })}
                                >
                                    {column.labelF ? column.labelF() : column.label}
                                    {" "}
                                    {column.sortValue && (
                                        sorting.value?.columnIndex !== i ? (
                                            <i className="fa fa-sort" />
                                        ) : sorting.value.asc ? (
                                            <i className="fa fa-sort-up" />
                                        ) : (
                                            <i className="fa fa-sort-down" />
                                        )
                                    )}
                                </th>
                            ))}
                        </tr>
                    </thead>
                )}

                <tbody>
                    {sortedList?.map((item, i) => (
                        <tr
                            className={cx(rowClassName ? rowClassName(item) : "")}
                            key={rowKey ? rowKey(item) : i}>
                            {columns.map((column, j) => (
                                <td
                                    key={j}
                                    className={cx(column.className, {"align-right": column.alignRight, "align-center": column.alignCenter, shy: column.shy})}
                                >
                                    {(column.format || column.sortValue)(item)}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    },
)

export const applySorting = (list, {sorting, columns}) => sorting == null ? list :
    chain(
        sort(list, (item) => columns[sorting.columnIndex].sortValue(item)),
        sorting.asc ? ((list) => list) : reverse
    );


