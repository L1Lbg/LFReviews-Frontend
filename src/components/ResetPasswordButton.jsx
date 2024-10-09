import { useSSR, useTranslation } from "react-i18next";
import {Context} from "../pages/Root";
import { useContext, useState } from "react";
import '../assets/ResetPasswordButton.css'

export default function ResetPasswordButton(props){
    const [t] = useTranslation('global')
    const [disabled, setDisabled] = useState(false)
    const { customFetch, setError, setSuccess } = useContext(Context);


    let email = props.email
    const handleSubmit = (e) => {
        e.preventDefault();
        setDisabled(true)
        if(props.email == undefined){
            email = e.target.children[0].value
        }

        customFetch(
          `/auth/manage/users/reset_password/`,
          {
            method: "POST",
            body:{ email: email },
          },
          false
        )
        .then(
          data => {
            console.log(data)
            if(!data.detail && !data.email){
              setSuccess('request-reset-password')
              return;
            }
            setError("request-reset-password");
            setDisabled(false)
          }
        )
    }

    return (
      <form onSubmit={handleSubmit} id='ResetPasswordForm'>
        {props.email == undefined ? (
          <input
            type="email"
            autoComplete="email"
            name="email"
            placeholder={t("Auth.mail-address-placeholder")}
          />
        ) : (
          <></>
        )}
        <button type="submit" disabled={disabled}>{t("Auth.reset-password-button")}</button>
      </form>
    );
}