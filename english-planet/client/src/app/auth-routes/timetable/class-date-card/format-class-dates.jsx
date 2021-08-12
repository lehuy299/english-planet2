import {ClassDateCard} from "./class-date-card";
import {cs} from "cs-react";

export const FormatClassDates = ({next}) => cs(
    ["classDateCard", (_, next) => ClassDateCard({next})],
    ({classDateCard}) => {
        return next(
            (classDate) => ({
                key: classDate.id,
                ...classDateCard.render(classDate),
            })
        )
    }
);
