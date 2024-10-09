import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../pages/Root";

export default function Logout(){   
    const {setEmail, customFetch} = useContext(Context);
    const navigate = useNavigate();
    const handleClick = () => {
        customFetch(
            '/auth/logout',
            {
                method: 'POST',
                body:{
                    'refresh':localStorage.getItem('refresh')
                }
            }
        )
        .then(
            data =>{
                if(!data.error){
                    setEmail(undefined);
                    localStorage.removeItem("email");
                    localStorage.removeItem("access");
                    localStorage.removeItem("access-expiry");
                    localStorage.removeItem("refresh");
                    navigate('/auth?form=login')
                }
            }
        )

    }


    return <button onClick={handleClick}>Logout</button>
}