import React from "react";

export const renderSelect = ({ list, valueToLabel = v=>v, isSelected = ()=>false, onChange, placeholder, ...props}) => (
    <select
        value={(list && list.findIndex(isSelected)) || ""}
        onClick={(e) => e.stopPropagation()}
        onChange={(e) => onChange(list[e.target.value])}
        {...props}
    >
        {(!list || list.findIndex(isSelected) === -1) && (
            <option value="">{placeholder}</option>
        )}
        {list && list.map((v, i) => (
            <option key={i} value={i}>{valueToLabel(v)}</option>
        ))}
    </select>
);
