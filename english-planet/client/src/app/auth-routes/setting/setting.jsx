import React from 'react';
import {Layout} from '../common/layout/layout';
import {bindInput} from '../../../../../../common/react/bind-input';
import {scope} from '../../../../../../common/react/scope';
import {bindInputNumber} from '../../../../../../common/react/bind-input-number';
import {createArray} from '../../../../../../common/utils/collections';
import {waitTimeout} from '../../../../../../common/utils/wait-timeout';
import {TestModal} from './test-modal';
import {DatePicker} from '../../common/date-picker/date-picker';
import {cs, Load2, State} from 'cs-react';

export const Setting = () => cs(
    ({}) => {
        return (
            <Layout {...{active: "setting"}}>
                <div className="setting-53d">
                    {cs(
                        ["date", (_, next) => State({next})],
                        ({date}) => (
                            <div className="date-picker-demo">
                                {DatePicker({
                                    ...date,
                                })}
                            </div>
                        )
                    )}
                    
                    
                    {cs(
                        ["anObject", (_, next) => State({
                            initValue: {a: [{c: "cc1"}, {c: "cc2"}], b: "bb", n: 123},
                            next,
                        })],
                        ({anObject}) => (
                            <div className="text-input">
                                <div>Text input</div>
                                <input {...bindInput(scope(anObject, ["a", 1, "c"]))} />
                                <input {...bindInput(scope(anObject, ["b"]))} />
                                <input {...bindInputNumber(scope(anObject, ["n"]))} />
                                <pre>
                                    {JSON.stringify(anObject.value, null, 2)}
                                </pre>
                            </div>
                        )
                    )}

                    {cs(
                        ["n", (_, next) => State({initValue: 0, next})],
                        ["data", ({n}, next) => Load2({
                            _key: n.value,
                            fetch: async () => {
                                await waitTimeout(1000);
                                return createArray(5).map((n1) => ({name: `number ${n.value * 5 + n1 + 1}`}));
                            },
                            next,
                        })],
                        ({data, n}) => (
                            <div className="async-load-state">
                                <div>Load data in state form</div>
                                <input {...bindInputNumber(n)} />
                                {data.loading ? "Loading..." : (
                                    data.value.map((_, i) => (
                                        <div key={i}>
                                            <input {...bindInput(scope(data, [i, "name"]))} />
                                        </div>
                                    ))
                                )}
                                <button onClick={() => data.reload()}>reload</button>
                                <pre>
                                    {JSON.stringify(data.value, null, 2)}
                                </pre>
                            </div>
                        )
                    )}
                    
                    {cs(
                        ["testModal", (_, next) => TestModal({next})],
                        ({testModal}) => (
                            <div className="modal">
                                <button
                                    onClick={() => testModal.show()}
                                >Open Modal</button>
                            </div>
                        )
                    )}
                </div>
            </Layout>
        )
    }
)
