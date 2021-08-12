import React from "react";
import './sign-in.scss';
import {cs, consumeContext} from "cs-react";

export const SignIn = (props) => cs(
    consumeContext("auth"),
    consumeContext("apis"),
    ({auth, apis}) => {
        return (
            <div
                className="sign-in-route-1b2"
            >
                Bam phat dang nhap luon
                <button
                    onClick={() => {
                        // await apis.user.login()
                        auth.login({name: "huy1", token: "5ytwrg"});
                        // props.history.push("/dashboard");
                    }}
                >Login</button>
            </div>
        )
    }
);
   



