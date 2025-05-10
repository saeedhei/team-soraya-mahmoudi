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
        <div className='max-w-md mx-auto p-6 bg-white rounded-lg shadow-md'>
            <h1 className='text-2xl font-bold mb-4'>Email Verification</h1>
            {isLoading? <p className='text-center text-gray-500'>Loading...</p>: <p className='text-center text-gray-500'>{status}</p>}
        </div>
    );
}

export default VerifyEmailPage;