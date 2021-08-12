const {weekDayLabels} = require("../../../../../common/formats/formats");
const {CheckboxLineGroup} = require("./checkbox-line-group/checkbox-line-group");
const {stateToCheckboxLineGroup} = require("./checkbox-line-group/state-to-checkbox-line-group");
const { stringListState } = require("./data-logic/string-list-state");

const DaysOfWeekSelect = (state) => {
    return CheckboxLineGroup({
        list: weekDayLabels.map((d, i) => ({label: d, value: i.toString()})),
        ...stateToCheckboxLineGroup(stringListState(state), ["value"]),
    })
};
exports.DaysOfWeekSelect = DaysOfWeekSelect;
