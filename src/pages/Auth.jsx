import '../assets/Auth.css';
import { useState, useContext, useEffect } from 'react';
import PasswordInput from '../components/PasswordInput';
import { useTranslation } from 'react-i18next';
import ResetPasswordButton from '../components/ResetPasswordButton';
import { Context } from '../pages/Root';
import { useNavigate, useSearchParams } from 'react-router-dom';
import GoogleButton from '../components/GoogleButton';

export default function Auth() {
  const [t] = useTranslation('global');
  const [toggleButtonContent, setToggleButtonContent] = useState(t('Auth.button-login'));
  const [signInOn, setSignInOn] = useState('none');
  const [signUpOn, setSignUpOn] = useState('block');
  const [toggleAuthProperties, setToggleAuthProperties] = useState({});
  const [errorContent, setErrorContent] = useState('');
  const [submitDisabled, setSubmitDisabled] = useState(false);
  const { customFetch, setSuccess, setEmail } = useContext(Context);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const toggleAuth = () => {
    setErrorContent('');
    setToggleAuthProperties({
      disabled: true
    });

    setTimeout(() => {
      document.querySelector("#Auth-Form-Sign-Up").className = 'Auth-Form';
      document.querySelector("#Auth-Form-Sign-In").className = 'Auth-Form';
      setToggleAuthProperties({
        disabled: false
      });
    }, 2000);

    if (toggleButtonContent == t("Auth.button-login")) {
      setToggleButtonContent(t("Auth.button-signup"));
      setSearchParams('form=login');

      document.querySelector("#Auth-Form-Sign-Up").className = "disappear Auth-Form";
      setTimeout(() => {
        document.querySelector("#Auth-Form-Sign-In").className = "appear Auth-Form";
        setSignInOn("block");
        setSignUpOn("none");
      }, 900);
    } else {
      setToggleButtonContent(t("Auth.button-login"));
      setSearchParams("form=signup");
      document.querySelector("#Auth-Form-Sign-In").className = "disappear Auth-Form";
      setTimeout(() => {
        document.querySelector("#Auth-Form-Sign-Up").className = "appear Auth-Form";
        setSignUpOn("block");
        setSignInOn("none");
      }, 900);
    }
  };

  const handleSignInSubmit = (e) => {
    e.preventDefault();
    setSubmitDisabled(true);

    const email = e.target.children[2].value;
    const password = e.target.children[3].children[0].value;
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
    if (!re.test(email)) {
      setSubmitDisabled(false);
      setErrorContent(t("Auth.invalid-mail"));
      return false;
    }
    if (password.length < 8) {
      setSubmitDisabled(false);
      setErrorContent(t("Auth.password-too-short"));
      return;
    }

    const currentUnixTime = Math.floor(Date.now() / 1000);

    customFetch(`/auth/token/`, {
      method: "POST",
      body: {
        email: email,
        password: password
      },
    }, false)
    .then((data) => {
      setSubmitDisabled(false);
      if (data.detail) {
        setErrorContent(t("Error.wrong-login"));
      } else {
        setSuccess('Success.login');
        localStorage.setItem('access', data.access);
        localStorage.setItem("refresh", data.refresh);
        localStorage.setItem("access-expiry", currentUnixTime + parseInt(import.meta.env.VITE_ACCESS_EXPIRY));
        localStorage.setItem("email", email);
        setEmail(email);
        setTimeout(() => {
          navigate('/');
        }, 3500);
      }
    });

    setSubmitDisabled(false);
  };

  const handleSignUpSubmit = (e) => {
    e.preventDefault();
    setErrorContent("");
    const email = e.target.children[2].value;
    const password = e.target.children[3].children[0].value;
    const re_password = e.target.children[4].children[0].value;

    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(email)) {
      setErrorContent(t('Auth.invalid-mail'));
      return;
    }
    if (password != re_password) {
      setErrorContent(t("Auth.not-corresponding-password"));
      return;
    }
    if (password.trim().length < 5) {
      if (e.target.children[3].style.display != 'none') {
        setErrorContent(t("Auth.invalid-password"));
        return;
      }
    }

    if (e.target.children[3].style.display == 'none') {
      e.target.children[3].style.display = 'flex';
      e.target.children[4].style.display = 'flex';
      e.target.children[3].className = 'Auth-Password-Input-Container appear';
      e.target.children[4].className = 'Auth-Password-Input-Container appear';
      e.target.children[5].className = 'Auth-Form-Submit glideDown';
      return;
    }

    setSubmitDisabled(true);

    customFetch(`/auth/manage/users/`, {
      method: 'POST',
      body: {
        "email": email,
        "password": password,
        "re_password": re_password,
        "lang": localStorage.getItem('lang')
      }
    }, false)
    .then(data => {
      setSubmitDisabled(false);
      if (Array.isArray(data.email)) {
        setErrorContent(t("Auth.email-used"));
      } else if (data.password) {
        setErrorContent(t('Auth.invalid-password'));
      } else if (data.email) {
        setSuccess("Success.signup");
        let elem = document.getElementById('Auth-Form-Sign-In');
        elem.email.value = email;
        toggleAuth();
      } else {
        setErrorContent(t('Error.fatal'));
      }
    });

    setSubmitDisabled(false);
  };

  useEffect(() => {
    let form = searchParams.get("form");
    if (form == 'login') {
      toggleAuth();
    }
  }, []);

  return (
    <div className="h-[70vh] bg-background flex items-center items-align justify-center px-4">
      <button
        className="fixed top-20 right-8 bg-grey-dark text-white px-6 py-2 rounded-lg shadow-lg hover:bg-black transition-colors duration-200"
        {...toggleAuthProperties}
        onClick={toggleAuth}
      >
        {toggleButtonContent}
      </button>

      <div className="w-full max-w-md">
        <form
          onSubmit={handleSignUpSubmit}
          style={{ display: signUpOn }}
          id="Auth-Form-Sign-Up"
          className="Auth-Form bg-grey-dark p-8 rounded-xl shadow-2xl"
        >
          <h1 className="text-4xl font-bold mb-2 text-gradient-blue">
            {t("Auth.signup-message")}
          </h1>
          <p className="text-grey-lighter mb-8">{t("Auth.signup-paragraph")}</p>
          <input
            className="w-full bg-grey-light text-white px-4 py-3 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-gradient-blue"
            type="email"
            name="email"
            autoComplete="email"
            placeholder={t("Auth.mail-address-placeholder")}
          />
          <PasswordInput
            placeholder={t("Auth.password-placeholder")}
            name="password"
            autoComplete="new-password"
            new_password={true}
            custom_style={{
              display: "none",
            }}
          />
          <PasswordInput
            placeholder={t("Auth.re-password-placeholder")}
            name="re-password"
            new_password={true}
            autoComplete="new-password"
            custom_style={{
              display: "none",
            }}
          />
          <div className="flex items-center gap-4">
            <button
              type="submit"
              className="flex-1 bg-gradient-blue text-white py-3 rounded-lg font-semibold hover:bg-high-gradient-blue transition-colors duration-200 disabled:opacity-50"
              disabled={submitDisabled}
            >
              {t("Auth.button-signup")}
            </button>
            <GoogleButton />
          </div>
          {errorContent && (
            <div className="mt-4 bg-red-500/10 border border-red-500 text-red-500 p-4 rounded-lg flex items-center gap-2">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
              </svg>
              {errorContent}
            </div>
          )}
        </form>

        <form
          onSubmit={handleSignInSubmit}
          style={{ display: signInOn }}
          id="Auth-Form-Sign-In"
          className="Auth-Form bg-grey-dark p-8 rounded-xl shadow-2xl"
        >
          <h1 className="text-4xl font-bold mb-2 text-gradient-blue">
            {t("Auth.login-message")}
          </h1>
          <p className="text-grey-lighter mb-8">{t("Auth.login-paragraph")}</p>
          <input
            className="w-full bg-grey-light text-white px-4 py-3 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-gradient-blue"
            type="email"
            name="email"
            autoComplete="username"
            placeholder={t("Auth.mail-address-placeholder")}
          />
          <PasswordInput
            placeholder={t("Auth.password-placeholder")}
            name="password"
            new_password={false}
            autoComplete="current-password"
          />
          <div className="flex items-center gap-4">
            <button
              type="submit"
              className="flex-1 bg-gradient-blue text-white py-3 rounded-lg font-semibold hover:bg-high-gradient-blue transition-colors duration-200 disabled:opacity-50"
              disabled={submitDisabled}
            >
              {t("Auth.button-login")}
            </button>
            <GoogleButton />
          </div>
          {errorContent && (
            <div className="mt-4 bg-red-500/10 border border-red-500 text-red-500 p-4 rounded-lg flex items-center gap-2">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
              </svg>
              {errorContent}
            </div>
          )}
        </form>

        <div className="mt-6">
          <ResetPasswordButton />
        </div>
      </div>
    </div>
  );
}