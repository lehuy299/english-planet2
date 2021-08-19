import React from 'react';
import {cs, consumeContext, keyed} from "cs-react";
import {getDatesInRangeIncluded, sameDate} from '../../../../../../common/utils/date-object';
import {formatWeekDate} from '../../../../../../common/formats/formats';
import "./week-table.scss";
import {SelectWeekRange} from '../../common/date-picker/select-week-range';
import {sort} from '../../../../../../common/utils/collections';
import {chain} from '../../../../../../common/utils/fs';

export const WeekTable = ({dateRange, cards, onDateContextMenu}) => cs(
    ({}) => {
        const dates = getDatesInRangeIncluded(dateRange.value);

        const rDate = (dateCards, date) => {
            return (
                <div 
                    className="date-column"
                    onContextMenu={(e) => onDateContextMenu ? onDateContextMenu(e, date) : undefined}
                >
                    {dateCards?.map((card, i) => {
                        return (
                            <div
                                className="item-card" key={card.key}
                                // onClick={card.onClick}
                                onClick={card.onContextMenu}
                            >
                                {card.render()}
                            </div>
                        );
                    })}
                </div>
            )
        };

        return (
            <div className="week-table-4f1 week-table">
                <div className="select-week">
                    {SelectWeekRange(dateRange)}
                </div>

                <div className="table">
                    <div className="header">
                        {dates.map((date, i) => (
                            <div
                                className="date" key={i}
                            >
                                {formatWeekDate(date)}
                            </div>
                        ))}
                    </div>
                    <div className="main">
                        {dates.map((date, i) => cs(
                            keyed(i),
                            ({}) => rDate(
                                chain(
                                    cards,
                                    (_) => _?.filter((card) => sameDate(card.date, date)),
                                    (_) => sort(_, (card) => card.time),
                                ),
                                date
                            )
                        ))}
                    </div>
                </div>
            </div> 
        )
    }
);
