import { getReasonPhrase } from "http-status-codes";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import useTimeout from "../hooks/useTimeout";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faFaceFrown} from '@fortawesome/free-regular-svg-icons'

export default function Error() {
    const [oneMinsPassed, setOneMinsPassed] = useState(false);
    const [fiveMinsPassed, setFiveMinsPassed] = useState(false);
    const [fifteenMinsPassed, setFifteenMinsPassed] = useState(false);
    const [eighteenMinsPassed, setEighteenMinsPassed] = useState(false);
    const [twentyMinsPassed, setTwentyMinsPassed] = useState(false);
    const {status} = useParams();

    useTimeout(() => {
        setOneMinsPassed(true);
    }, 60000);
    useTimeout(() => {
        setFiveMinsPassed(true);
    }, 300000);
    useTimeout(() => {
        setFifteenMinsPassed(true);
    }, 900000);
    useTimeout(() => {
        setEighteenMinsPassed(true);
    }, 1080000);
    useTimeout(() => {
        setTwentyMinsPassed(true);
    }, 1200000);

    function safeGetReason(status){
        try {
            return getReasonPhrase(status);
        } catch (error) {
            return "Not a Valid HTTP Response Code";
        }
    }

    return (
        <article className="flex content-center justify-center">
            <div className="flex flex-col text-center justify-center mt-40">
            { (status >= 200 && status < 300) ?
                <p className="text-3xl">Are you sure you're supposed to be here?</p> :
                <p className="text-3xl">Error {status}: {safeGetReason(status)}! <FontAwesomeIcon icon={faFaceFrown}/></p> 
            }
            { oneMinsPassed &&
                <p className="text-xl">Nothing to see here...</p>
            }
            { fiveMinsPassed &&
                <p className="text-lg">Why are you still here? Stop loitering!</p>
            }
            { fifteenMinsPassed &&
                <p className="text-md">Alright... I give up. You win. Give me a second and I'll give you a little secret.</p>
            }
            { eighteenMinsPassed &&
                <p className="text-sm">{"Oh? Getting impatient? >:)"}</p>
            }
            { twentyMinsPassed &&
                <p className="text-xs">Okay, here it is! Or at least it would be if we'd implemented it yet...</p>
            }
            </div>
        </article>
    );
}