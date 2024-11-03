import { useEffect } from "react";

export default function GoogleLogin(){
    useEffect(()=>{
        const queryParameters = new URLSearchParams(window.location.search)
        const access = queryParameters.get('access')
        const refresh = queryParameters.get('refresh')
        const email = queryParameters.get('email')
        const currentUnixTime = Math.floor(Date.now() / 1000);

        localStorage.setItem('access', access)
        localStorage.setItem('refresh', refresh)
        localStorage.setItem("access-expiry",currentUnixTime + parseInt(import.meta.env.VITE_ACCESS_EXPIRY));
        localStorage.setItem("email", email);

        // we use native js to trigger a refresh, instead of navigate
        window.location.href = '/'

        
    },[])
    
    return (
        <>Redirecting...</>
    )
}