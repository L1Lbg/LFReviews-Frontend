import { useEffect, useState } from 'react';
import '../assets/CookiePopup.css';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
export default function CookiePopup(){
    const [t] = useTranslation('global')
    const [style, setStyle] = useState({ display: "none" });

    useEffect(()=>{
        if(localStorage.getItem('cookies-accepted') == undefined){
            setStyle({
                'display':'grid'
            })
        } else {
            setStyle({
              display: "none",
            });
        }
    }, [])

    const handleClick = (value) => {
      localStorage.setItem("cookies-accepted", value);
      setStyle({
        display: "none",
      });
    };
    return (
      <div id="CookiePopup" style={style}>
        <p>
          {t("Cookies.cookie-acceptance")}
          <Link to="cookie-policy">Politique de Cookies</Link>.
        </p>
        <button onClick={() => handleClick(true)}>Accepter</button>
        <button onClick={() => handleClick(false)}>Denier</button>
      </div>
    );
}