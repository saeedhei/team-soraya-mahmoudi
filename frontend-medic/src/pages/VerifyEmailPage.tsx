import React, {useEffect, useState}from 'react';

const VerifyEmailPage=()=>{
    const [status, setStatus]=useState<string | null>(null)
}

useEffect(
    ()=>{
        const params=new URLSearchParams(window.location.search);
        const token= params.get('token');
    }
)