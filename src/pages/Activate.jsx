import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import {Context} from "../pages/Root";
import { useContext } from "react";

export default function Activate(){
    const { customFetch } = useContext(Context);
    const [content, setContent] = useState('');
    const {uid, token} = useParams();
    const [t] = useTranslation('global');
    const navigate = useNavigate();

    

    useEffect(()=>{
        customFetch(`/auth/manage/users/activation/`, 
        {
            method: "POST",
            body: {
                uid: uid,
                token: token,
            }
        },
        false
        )
        .then(data => {
            setTimeout(() => {
              navigate(`/auth?form=login`);
            }, 3000);
        })
    },[])

    return (
        <>
            {content}
        </>
    )
}