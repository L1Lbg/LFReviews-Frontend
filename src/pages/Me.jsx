import { useContext, useEffect, useState } from "react"
import { Context } from "./Root"
import '../assets/Me.css';
import { useTranslation } from "react-i18next";

export default function Me(){
    const {customFetch} = useContext(Context);
    const [t] = useTranslation('global')
    const [data, setData] = useState({})

    useEffect(()=>{
        customFetch(
            'auth/me',
            {
                method: 'GET',
            }
        )
        .then(
            data => {
                setData(data)
            }
        )
    },[])
    return (
        <div id="me">
            <span>
                <img src="/Icons/AccountCircle.svg" alt="Auth Icon" /> 
                {t('Me.title')}
            </span>
            <div id="me-ranking">
                <div>
                    TOP #1
                </div>
                <div>{data.num} Reviews</div>
            </div>
            <div id="me-stats">
                <div>
                    {t('Me.average')}: 
                    <div>
                        <img src="/Icons/Star.svg" alt="Star" />
                        <span>{parseFloat(data.average).toFixed(1)}</span>
                    </div>
                </div>
                <div>{t('Me.popularity')}: {data.popularity}%</div>
                <div>{t('Me.joined')} {data.since}</div>
                <a href="/me/reviews">{t('Me.myreviews')}</a>
                <a href="/me/favorites">{t('Me.favorites')}</a>
            </div>
        </div>
    )
}