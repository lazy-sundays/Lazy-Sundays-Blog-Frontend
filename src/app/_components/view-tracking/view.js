"use client";

import {useEffect} from "react";

export default function  ReportView({id}) {
    useEffect(() =>{
        fetch("/api/increment", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({id}),
        });
    }, [id]);
    
    return false;
};