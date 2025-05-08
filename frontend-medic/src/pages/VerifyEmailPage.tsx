import React, {useEffect, useState}from 'react';

const VerifyEmailPage=()=>{
    const [status, setStatus]=useState<string | null>(null)


useEffect(
    ()=>{
        const params=new URLSearchParams(window.location.search);
        const token= params.get('token');

        if(token){
            fetch('http://localhost:3000/verify-email',{
                method:'POST',
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify({token}),
            })
            .then((res)=>res.json())
            .then((data)=>{
                setStatus(data.message);
            })
            .catch(()=>{
              setStatus('Something went wrong!');
            });
        }
    },[]);
}