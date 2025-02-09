import { useSSR, useTranslation } from "react-i18next";
import { Context } from "../pages/Root";
import { useContext, useState } from "react";

export default function ResetPasswordButton(props) {
  const [t] = useTranslation('global');
  const [disabled, setDisabled] = useState(false);
  const { customFetch, setError, setSuccess } = useContext(Context);

  let email = props.email;
  const handleSubmit = (e) => {
    e.preventDefault();
    setDisabled(true);
    if (props.email == undefined) {
      email = e.target.children[0].value;
    }

    customFetch(
      `/auth/manage/users/reset_password/`,
      {
        method: "POST",
        body: { email: email },
      },
      false
    ).then((data) => {
      if (!data.detail && !data.email) {
        setSuccess('request-reset-password');
        return;
      }
      setError("request-reset-password");
      setDisabled(false);
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-grey-light rounded-lg overflow-hidden flex">
      {props.email == undefined ? (
        <input
          type="email"
          autoComplete="email"
          name="email"
          placeholder={t("Auth.mail-address-placeholder")}
          className="flex-1 bg-transparent text-white px-4 py-2 text-sm focus:outline-none"
        />
      ) : null}
      <button
        type="submit"
        disabled={disabled}
        className="bg-grey-dark text-white px-4 py-2 text-sm hover:bg-black transition-colors duration-200 disabled:opacity-50"
      >
        {t("Auth.reset-password-button")}
      </button>
    </form>
  );
}