import React from "react";
import './sign-in.scss';
import {cs, consumeContext, State} from "cs-react";
import {bindInput} from "../../../../../../common/react/bind-input";
import {scope} from "../../../../../../common/react/scope";

export const SignIn = () => cs(
    consumeContext("auth"),
    consumeContext("apis"),
    ["state", (_, next) => State({next})],
    ["error", (_, next) => State({next})],
    ({auth, apis, state, error}) => {
        return (
            <div
                className="sign-in-route-1b2"
            >
                <div className="box">
                    <div className="header">
                        <div className="logo">
                            <img src={require("./english-planet-icon.png")} alt=""/>
                        </div>
                        <div className="message1">Hello! Let's get started</div>
                        <div className="message2">Sign in to continue.</div>
                        {error.value && (
                            <div className="error">
                                ERROR: Username or Password is Incorrect
                            </div>
                        )}
                    </div>
                    <div className="form-area">
                        <div className="form-group">
                            <div className="control-label">
                                Username
                            </div>
                            <input {...bindInput(scope(state, ["login_name"]))} />
                        </div>
                        <div className="form-group">
                            <div className="control-label">
                                Password
                            </div>
                            <input type="password" {...bindInput(scope(state, ["password"]))} />
                        </div>

                        <div className="button">
                            <button
                                className="primary"
                                onClick={async () => {
                                    const res = await apis.login(state.value);      
                                    if (res.success) {
                                        auth.login(res);
                                    } else {
                                        error.onChange(res);
                                    } 
                                }}
                            >Login</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
);
   