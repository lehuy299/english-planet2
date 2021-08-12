import React from 'react';
import {cs, consumeContext, Load2, State} from 'cs-react';
import {Card} from '../common/card/card';
import {Layout} from '../common/layout/layout';
import {TeacherList} from './teacher-list/teacher-list';
import './teacher.scss';
import {AddTeacherModal} from './add-teacher-modal/add-teacher-modal';
import {SearchTeacher} from './search-teacher/search-teacher';
import {CardExpandable} from '../common/card/card';

export const Teacher = () => cs(
    consumeContext("resolve"),
    ["addTeacherModal", ({resolve}, next) => AddTeacherModal({
        onDone: (newTeacher) => resolve.updateTeachers([newTeacher, ...resolve.teachers]),
        next,
    })],
    ["search", (_, next) => State({next})],
    (_, next) => <Layout {...{active: "teacher"}}>{next()}</Layout>,
    ({search, addTeacherModal, resolve}) => {
        return (
            <div className='teacher-1k3'>
                <div className="title">Teachers</div>

                <div className="controls">
                    <button 
                        className="primary"
                        onClick={() => {
                            addTeacherModal.show();
                            // search.onChange(null);
                        }}
                    >Add Teacher</button>
                </div>

                {Card({
                    title: "Who are you looking for?",
                    renderContent: () => SearchTeacher({
                        onSearch: (conditions) => search.onChange(conditions),
                    }),
                    className: "search-teacher",
                })}

                {Card({
                    // title: "Teachers Having Class Today",
                    renderContent: () => TeacherList({teachers: resolve.teachers, searchConditions: search.value}),
                    className: "teacher-list-card",
                })}
            </div>
        )
    }
)
