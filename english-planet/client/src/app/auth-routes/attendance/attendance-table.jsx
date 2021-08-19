import React from 'react';
import {cs, consumeContext, Load2, State} from 'cs-react';
import {chain} from '../../../../../../common/utils/fs';
import {ge, le} from '../../../../../../common/utils/date-object';
import {Checkbox} from '../../common/checkbox/checkbox';
import {scope} from '../../../../../../common/react/scope';
import "./attendance-table.scss";
import {equalDeep} from '../../../../../../common/utils/equal-deep';
import {bindInput} from '../../../../../../common/react/bind-input';
import {formatDate} from '../../../../../../common/formats/formats';

export const AttendanceTable = ({classDate: oriClassDate, enrollments}) => cs(
    ["classDate", (_, next) => State({
        initValue: oriClassDate.value,
        next,
    })],
    consumeContext("resolve"),
    consumeContext("apis"),
    ({resolve, classDate, apis}) => {
        if (!classDate.value) {
            return;
        }
        return (
            <div className="attendance-table-6h5">
                <div className="title">
                    {resolve.getClass(classDate.value.class_id).name} - {formatDate(classDate.value.date)} - Room {classDate.value.room}
                </div>
                <div className="controls">
                    <button
                        className="primary"
                        disabled={equalDeep(oriClassDate.value, classDate.value)}
                        onClick={async () => {
                            const updated = await apis.classDate.upsertClassDate(classDate.value);
                            oriClassDate.onChange(updated);
                        }}
                    >Save</button>
                </div>
                <div className="table">
                    <table>
                        <thead>
                            <tr>
                                <th>Student</th>
                                <th>Absent</th>
                                <th>Comment</th>
                            </tr>
                        </thead>
                        <tbody>
                            {chain(
                                enrollments,
                                (_) => _?.filter((erm) =>
                                    (!erm.date_start || ge(classDate.value.date, erm.date_start)) && (!erm.date_end || le(classDate.value.date, erm.date_end))
                                ),
                                (_) => _?.map((erm) => (
                                    <tr
                                        key={erm.id}
                                    >
                                        <td className="student">{resolve.getStudent(erm.student_id).name}</td>
                                        <td className="absent">
                                            {Checkbox({
                                                state: scope(classDate, ["performance", erm.student_id, "absent"]),
                                            })}
                                        </td>
                                        <td className="comment">
                                            <textarea {...bindInput(scope(classDate, ["performance", erm.student_id, "comment"]))}/>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
);
