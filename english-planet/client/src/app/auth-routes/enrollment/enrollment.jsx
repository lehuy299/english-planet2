import React from 'react';
import {Layout} from "../common/layout/layout";
import {cs, consumeContext, Load2, State} from 'cs-react';
import "./enrollment.scss";
import {Card} from '../common/card/card';
import {DropdownSelectSearch} from '../../common/dropdown-select/dropdown-select-search';
import {spc} from '../../../../../../common/react/state-path-change';
import {EnrollmentList} from './enrollment-list/enrollment-list';
import {AddEnrollmentModal} from './enrollment-modal/add-enrollment-modal';
import {replaceFind_f} from '../../../../../../common/utils/collections';

export const Enrollment = () => cs(
    consumeContext("routing"),
    consumeContext("resolve"),
    consumeContext("apis"),
    ["current", ({routing}, next) => State({
        initValue: routing.getQuery(),
        next,
    })],
    ["enrollments", ({current, apis}, next) => Load2({
        _key: JSON.stringify(current.value),
        fetch: () => (current.value?.studentId || current.value?.classId) && apis.enrollment.getEnrollments(current.value),
        next,
    })],
    ["addEnrollmentModal", ({enrollments, resolve}, next) => AddEnrollmentModal({
        onDone: (newErm) => {
            if (
                !enrollments.value?.length
                || !(enrollments.value.map((e) => e.student_id).includes(newErm.student_id)
                && enrollments.value.map((e) => e.class_id).includes(newErm.class_id))
            ) {
                enrollments.onChange([...(enrollments.value || []), newErm]);
            }
            resolve.updateStudents(replaceFind_f(
                resolve.students, 
                (s) => ({...s, class_ids: [...(s.class_ids || []), newErm.class_id]}), 
                (s) => s.id === newErm.student_id
            ));
        },
        next,
    })],
    (_, next) => <Layout {...{active: "enrollment"}}>{next()}</Layout>,
    ({resolve, current, enrollments, addEnrollmentModal}) => {
        return (
            <div className="enrollment-53d">
                <div className="title">Enrollments</div>

                <div className="controls">
                    <button
                        className="primary"
                        disabled={!current.value?.studentId}
                        onClick={() => {
                            addEnrollmentModal.show(current.value);
                        }}
                    >Add Enrollment</button>
                </div>

                {Card({
                    // title: "Student",
                    renderContent: () => (
                        <div className="flex-group">
                            <div className="form-group">
                                <div className="control-label">Student</div>
                                {DropdownSelectSearch({
                                    list: [...resolve.students, null],
                                    isSelected: (c) => (c?.id && current.value?.studentId === c.id) || !c?.id,
                                    onChange: (c) => spc(current, ["studentId"], () => c?.id),
                                    valueToLabel: (c) => c?.name || "All",
                                    valueToSearch: (c) => c?.name || "All",
                                })}
                            </div>
                            <div className="form-group">
                                <div className="control-label">Class</div>
                                {DropdownSelectSearch({
                                    list: [...resolve.classes, null],
                                    isSelected: (c) => (c?.id && current.value?.classId === c.id) || !c?.id,
                                    onChange: (c) => spc(current, ["classId"], () => c?.id),
                                    valueToLabel: (c) => c?.name || "All",
                                    valueToSearch: (c) => c?.name || "All",
                                })}
                            </div>
                        </div>
                    ),
                    className: "search-panel",
                })}

                {Card({
                    title: "Enrollments",
                    renderContent: () => enrollments.loading 
                        ? "Loading..." 
                        : !enrollments.value?.length ? "There are not any enrollments." : 
                            EnrollmentList({
                                enrollments,
                                current: current.value,
                                onDelete: (deleted) => {
                                    enrollments.onChange(enrollments.value.filter((e) => e.id !== deleted.id));
                                    resolve.updateStudents(replaceFind_f(
                                        resolve.students,
                                        (s) => ({...s, class_ids: s.class_ids.filter((cid) => cid !== deleted.class_id)}),
                                        (s) => s.id === deleted.student_id
                                    ));
                                },
                                showByStudent: !current.value?.studentId,
                            }),
                    className: "enrollment-panel",
                })}
            </div>
        )
    }
);



