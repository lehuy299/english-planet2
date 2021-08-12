import React from 'react';
import {cs, consumeContext, Load2, State} from 'cs-react';
import {Card} from '../common/card/card';
import {Layout} from '../common/layout/layout';
import {StudentList} from './student-list/student-list';
import './student.scss';
import {AddStudentModal} from './add-student-modal/add-student-modal';
import {SearchStudent} from './search-student/search-student';
import {CardExpandable} from '../common/card/card';

export const Student = () => cs(
    consumeContext("resolve"),
    ["addStudentModal", ({resolve}, next) => AddStudentModal({
        onDone: (newStudent) => resolve.updateStudents([newStudent, ...resolve.students]),
        next,
    })],
    ["search", (_, next) => State({next})],
    (_, next) => <Layout {...{active: "student"}}>{next()}</Layout>,
    ({search, addStudentModal, resolve}) => {
        return (
            <div className='student-1j4'>
                <div className="title">Students</div>

                <div className="controls">
                    <button 
                        className="primary"
                        onClick={() => {
                            addStudentModal.show();
                            // search.onChange(null);
                        }}
                    >Add Student</button>
                </div>

                {Card({
                    title: "Who are you looking for?",
                    renderContent: () => SearchStudent({
                        onSearch: (conditions) => search.onChange(conditions),
                    }),
                    className: "search-student",
                })}

                {Card({
                    // title: "Students Having Class Today",
                    renderContent: () => StudentList({students: resolve.students, searchConditions: search.value}),
                    className: "student-list-card",
                })}
            </div>
        )
    }
)
