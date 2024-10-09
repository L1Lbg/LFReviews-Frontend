import '../assets/Auth.css';
import {useState, useContext, useEffect} from 'react';
import PasswordInput from '../components/PasswordInput';
import {useTranslation} from 'react-i18next';
import ResetPasswordButton from '../components/ResetPasswordButton';
import { Context } from '../pages/Root'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';

export default function Auth(){
    const [t] = useTranslation('global');
    const [toggleButtonContent, setToggleButtonContent] = useState(t('Auth.button-login'));
    const [signInOn, setSignInOn] = useState('none');
    const [signUpOn, setSignUpOn] = useState('block');
    const [toggleAuthProperties,  setToggleAuthProperties] = useState({});
    const [errorContent, setErrorContent] = useState('')
    const [submitDisabled, setSubmitDisabled] = useState(false)  
    const { customFetch, setSuccess, setEmail } = useContext(Context);
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();

    //* toggle forms
    const toggleAuth = () => {
      setErrorContent('')
        setToggleAuthProperties({
            disabled:true
        })
        // reset classes
        setTimeout(()=>{
            document.querySelector("#Auth-Form-Sign-Up").className = 'Auth-Form';
            document.querySelector("#Auth-Form-Sign-In").className = 'Auth-Form';
            setToggleAuthProperties({
                disabled:false
            })
        }, 2000)


        // *toggle between signup form and login with transition
        if (toggleButtonContent == t("Auth.button-login")) {
          setToggleButtonContent(t("Auth.button-signup"));
          setSearchParams('form=login')

          document.querySelector("#Auth-Form-Sign-Up").className =
            "disappear Auth-Form";
          setTimeout(() => {
            document.querySelector("#Auth-Form-Sign-In").className =
              "appear Auth-Form";
            setSignInOn("block");
            setSignUpOn("none");
          }, 900);
        } else if (toggleButtonContent == t("Auth.button-signup")) {
          setToggleButtonContent(t("Auth.button-login"));
          setSearchParams("form=signup");
          document.querySelector("#Auth-Form-Sign-In").className =
            "disappear Auth-Form";
          setTimeout(() => {
            document.querySelector("#Auth-Form-Sign-Up").className =
              "appear Auth-Form";
            setSignUpOn("block");
            setSignInOn("none");
          }, 900);
        }
    }

      //*submit
    const handleSignInSubmit = (e) => {
      e.preventDefault();
      setSubmitDisabled(true);

      //*sanitize
      const email = e.target.children[2].value
      const password = e.target.children[3].children[0].value
      let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!re.test(email)) {
        setSubmitDisabled(false);
        setErrorContent(t("Auth.invalid-mail"));
        return false;
      }
      if(password.length < 8){
        setSubmitDisabled(false);
        setErrorContent(t("Auth.password-too-short"))
        return;
      }
      const currentUnixTime = Math.floor(Date.now() / 1000);

      customFetch(`/auth/token/`, {
          method: "POST",
          body: {
            email: email,
            password: password 
          },
        }, 
        false // don't send auth tokens
      )
        .then((data) => {
          setSubmitDisabled(false)
          if(data.detail){
            setErrorContent(t("Error.wrong-login"));
          } else {
            setSuccess('Success.login')
            localStorage.setItem('access',data.access)
            localStorage.setItem("refresh", data.refresh)
            localStorage.setItem("access-expiry",currentUnixTime + parseInt(import.meta.env.VITE_ACCESS_EXPIRY));
            localStorage.setItem("email", email);
            setEmail(email)
            setTimeout(()=>{
              navigate('/')
            },3500)
          }
        });

        setSubmitDisabled(false);
    }
    
    const handleSignUpSubmit = (e) => {
        e.preventDefault()
        setErrorContent("")
        const email = e.target.children[2].value;
        const password = e.target.children[3].children[0].value;
        const re_password = e.target.children[4].children[0].value;

        // sanitize
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(!re.test(email)){
            setErrorContent(t('Auth.invalid-mail'))
            return;
        }
        if(password != re_password){
            setErrorContent(t("Auth.not-corresponding-password"))
            return;
        }
        if(password.trim().length < 5){
            if(e.target.children[3].style.display != 'none'){
                setErrorContent(t("Auth.invalid-password"));
                return;
            }
        }
        
        if(e.target.children[3].style.display == 'none'){ // if password input is not visible
            //e.target.parentElement.children[2].disabled = true
            e.target.children[3].style.display = 'flex'
            e.target.children[4].style.display = 'flex'
            
            e.target.children[3].className = 'Auth-Password-Input-Container appear'
            e.target.children[4].className = 'Auth-Password-Input-Container appear'
            e.target.children[5].className = 'Auth-Form-Submit glideDown'
            return;
        } 

        setSubmitDisabled(true);

        customFetch(`/auth/manage/users/`,
          {
            method:'POST',
            body: {
              "email": email,
              "password": password,
              "re_password":re_password,
              "lang":localStorage.getItem('lang')
              }
          },
          false // don't send auth tokens
        )
        .then(
          data => {
            setSubmitDisabled(false);
            // sanitize 
            if(Array.isArray(data.email)){ // if response contains an array as the email, it's an error
              setErrorContent(t("Auth.email-used"));
            } else if(data.password){
              setErrorContent(t('Auth.invalid-password'))
            } else if(data.email) { // if response contains an email as a string
              setSuccess("Success.signup");
              let elem = document.getElementById('Auth-Form-Sign-In')
              elem.email.value = email
              toggleAuth();
            } else {
              setErrorContent(t('Error.fatal'));
            }
          } 
        )

        setSubmitDisabled(false);
    }
    
    //* 
    useEffect(()=>{
      let form = searchParams.get("form");
      if(form == 'login'){
        toggleAuth()
      }
    },[]);
    return (
      <div id="Auth">
        <button
          id="Auth-ToggleButton"
          {...toggleAuthProperties}
          onClick={toggleAuth}
        >
          {toggleButtonContent}
        </button>

        <div id="Auth-Form-Container">
          <form
            onSubmit={handleSignUpSubmit}
            style={{ display: signUpOn }}
            id="Auth-Form-Sign-Up"
            className="Auth-Form"
            method="POST"
          >
            <h1>{t("Auth.signup-message")}</h1>
            <p>{t("Auth.signup-paragraph")}</p>
            <input
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
            <button
              type="submit"
              className="Auth-Form-Submit"
              disabled={submitDisabled}
            >
              {t("Auth.button-signup")}
            </button>
            {errorContent != "" ? (
              <div className="Auth-Form-Error">
                <svg
                  focusable="false"
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  data-testid="StatusEscalatedIcon"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm2.293-4.293L12 13.414l-2.293 2.293-1.414-1.414L10.586 12 8.293 9.707l1.414-1.414L12 10.586l2.293-2.293 1.414 1.414L13.414 12l2.293 2.293-1.414 1.414Z"
                  ></path>
                </svg>
                {errorContent}
              </div>
            ) : (
              <></>
            )}
          </form>
          <form
            onSubmit={handleSignInSubmit}
            style={{ display: signInOn }}
            action=""
            id="Auth-Form-Sign-In"
            className="Auth-Form"
            method="POST"
          >
            <h1>{t("Auth.login-message")}</h1>
            <p>{t("Auth.login-paragraph")}</p>
            <input
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
            <button
              type="submit"
              className="Auth-Form-Submit"
              disabled={submitDisabled}
            >
              {t("Auth.button-login")}
            </button>
            {errorContent != "" ? (
              <div className="Auth-Form-Error">
                <svg
                  focusable="false"
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  data-testid="StatusEscalatedIcon"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm2.293-4.293L12 13.414l-2.293 2.293-1.414-1.414L10.586 12 8.293 9.707l1.414-1.414L12 10.586l2.293-2.293 1.414 1.414L13.414 12l2.293 2.293-1.414 1.414Z"
                  ></path>
                </svg>
                {errorContent}
              </div>
            ) : (
              <></>
            )}
          </form>
          <ResetPasswordButton />
        </div>
      </div>
    );
}