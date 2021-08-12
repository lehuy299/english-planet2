import React from 'react';
import {cs, consumeContext, Load2, State} from 'cs-react';
import {Card} from '../common/card/card';
import {Layout} from '../common/layout/layout';
import {ClassList} from './class-list/class-list';
import './class.scss';
import {AddClassModal} from './add-class-modal/add-class-modal';
import {SearchClass} from './search-class/search-class';

export const Class = () => cs(
    consumeContext("apis"),
    consumeContext("resolve"),
    ["addClassModal", ({resolve}, next) => AddClassModal({
        onDone: (newClass) => resolve.updateClasses([newClass, ...resolve.classes]),
        next,
    })],
    ["search", (_, next) => State({next})],
    (_, next) => <Layout {...{active: "class"}}>{next()}</Layout>,
    ({resolve, search, addClassModal}) => {
        return (
            <div className='class-1j4'>
                <div className="title">Classes</div>

                <div className="controls">
                    <button 
                        className="primary"
                        onClick={() => addClassModal.show()}
                    >Add Class</button>
                </div>

                {Card({
                    title: "Which class are you looking for?",
                    renderContent: () => SearchClass({
                        onSearch: (conditions) => search.onChange(conditions),
                    }),
                    className: "search-class",
                })}

                {Card({
                    title: "Classs",
                    renderContent: () => ClassList({classes: resolve.classes, searchConditions: search.value}),
                    className: "class-list-card",
                })}
            </div>
        )
    }
)
