const {weekDayLabels} = require("../../../../../common/formats/formats");
const {CheckboxLineGroup} = require("./checkbox-line-group/checkbox-line-group");
const {stateToCheckboxLineGroup} = require("./checkbox-line-group/state-to-checkbox-line-group");
const { stringListState } = require("./data-logic/string-list-state");

export const DaysOfWeekSelect = (state, dowList) => {
    const list = weekDayLabels.map((d, i) => ({label: d, value: i.toString()}));
    return CheckboxLineGroup({
        list: dowList ? list.filter(({label, value}) => dowList.includes(value)) : list,
        ...stateToCheckboxLineGroup(stringListState(state), ["value"]),
    })
};
