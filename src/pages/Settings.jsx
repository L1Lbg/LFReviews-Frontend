import { useContext, useEffect, useState } from "react"
import ResetPasswordButton from "../components/ResetPasswordButton";
import { Context } from '../pages/Root';
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Settings(){
    const { customFetch, email, setEmail } = useContext(Context);
    const [lang, setLang] = useState(localStorage.getItem('lang'))
    const [t] = useTranslation('global')
    const navigate = useNavigate();
    
    
    useEffect(()=>{
      if (localStorage.getItem("email") == null) {
        navigate("/auth");
      } else {
        customFetch(`/auth/manage/users/me/`, {
          method: "GET",
        }).then((data) => {
          setEmail(data.email);
        });
      }
    },[]);

    const handleLangChange = (e) => {
      setLang(e.target.value)
        localStorage.setItem('lang', e.target.value)
        window.location.reload()
    }

    return (
      <>
        {email}
        <ResetPasswordButton email={email} />
        {t('Settings.PageLanguage')}
        <select onChange={handleLangChange} defaultValue={lang}>
          <option value={'fr'}>Français</option>
          <option value={'es'}>Español</option>
          <option value={'en'}>English</option>
        </select>
      </>
    );
}