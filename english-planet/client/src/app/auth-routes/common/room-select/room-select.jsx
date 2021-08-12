import {DropdownSelect} from "../../../common/dropdown-select/dropdown-select";
import {stateToSelect} from "../../../common/dropdown-select/state-to-select";
import rooms from "./rooms";

export const RoomSelect = (state) => {
    return DropdownSelect({
        list: rooms,
        ...stateToSelect(state),
    });
};
