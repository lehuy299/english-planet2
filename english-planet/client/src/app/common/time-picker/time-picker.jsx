import {cs, StaticRef} from "cs-react";
import {cx} from "emotion";
import React from "react";
import {formatHour} from "../../../../../../common/formats/formats";
import {createArray} from "../../../../../../common/utils/collections";
import {DropdownSelect} from "../dropdown-select/dropdown-select";

export const TimePicker = ({value, onChange, from, to, step}) => cs(
    ({}) => {
        return DropdownSelect({
            list: generateHours(from || 0, to || 24, step || 5),
            valueToLabel: (hour) => hour == null ? "" : formatHour(hour),
            isSelected: (h) => h === value,
            onChange,
        })
    }
);

const generateHours = (from, to, step) => {
    return createArray((to - from) * 60 / step).map((i) => from + i * step / 60);
};
