import React, {useEffect, useState}from 'react';

const VerifyEmailPage=()=>{
    const [status, setStatus]=useState<string | null>(null)
    const [isLoading, setIsLoading]=useState <boolean>(true);

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
                setIsLoading(false);
            })
            .catch(()=>{
              setStatus('Something went wrong!');
              setIsLoading(false);
            });
        }else{
            setStatus('No verification token found!');
            setIsLoading(false);
        }
    },[]);

    return(
        <div>
            <h1>Email Verification</h1>
            {isLoading? <p>Loading...</p>: <p>{status}</p>}
        </div>
    );
}

export default VerifyEmailPage;