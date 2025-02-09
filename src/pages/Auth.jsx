import { useState, useContext } from "react"
import { useTranslation } from "react-i18next"
import { useNavigate, useSearchParams } from "react-router-dom"
import { Context } from "../pages/Root"
import PasswordInput from "../components/PasswordInput"
import GoogleButton from "../components/GoogleButton"
import ResetPasswordButton from "../components/ResetPasswordButton"
import React from "react" // Added import for React

export default function Auth() {
  const [t] = useTranslation("global")
  const [searchParams, setSearchParams] = useSearchParams()
  const [isLoginForm, setIsLoginForm] = useState(searchParams.get("form") !== "signup")
  const { customFetch, setSuccess, setEmail } = useContext(Context)
  const navigate = useNavigate()

  const [loginEmail, setLoginEmail] = useState("")
  const [loginPassword, setLoginPassword] = useState("")
  const [signupEmail, setSignupEmail] = useState("")
  const [signupPassword, setSignupPassword] = useState("")
  const [signupConfirmPassword, setSignupConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSignup = async (e) => {
    e.preventDefault()
    setError("")


    if (!signupEmail || !signupPassword || !signupConfirmPassword) {
      setError(t("Auth.all-fields-required"))
      return
    }

    if (signupPassword !== signupConfirmPassword) {
      setError(t("Auth.not-corresponding-password"))
      return
    }

    if (signupPassword.length < 8) {
      setError(t("Auth.password-too-short"))
      return
    }

    setIsSubmitting(true)
    try {
      const response = await customFetch(
        `/auth/manage/users/`,
        {
          method: "POST",
          body: {
            email: signupEmail,
            password: signupPassword,
            re_password: signupConfirmPassword,
            lang: localStorage.getItem("lang"),
          },
        },
        false,
      )

      if (Array.isArray(response.email)) {
        throw new Error(t("Auth.email-used"))
      } else if (response.password) {
        throw new Error(t("Auth.invalid-password"))
      } else if (response.email) {
        setSuccess("Success.signup")
        setIsLoginForm(true)
        setSearchParams({ form: "login" })
        setLoginEmail(signupEmail)
      } else {
        throw new Error(t("Error.fatal"))
      }
    } catch (err) {
      setError(err.message || t("Error.signup-failed"))
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    setError("")

    console.log(loginPassword)
    if (!loginEmail || !loginPassword) {
      setError(t("Auth.all-fields-required"))
      return
    }

    setIsSubmitting(true)
    try {
      const currentUnixTime = Math.floor(Date.now() / 1000)
      const response = await customFetch(
        `/auth/token/`,
        {
          method: "POST",
          body: { email: loginEmail, password: loginPassword },
        },
        false,
      )

      if (response.detail || response.error) {
        throw new Error(t("Error.wrong-login"))
      } else {
        setSuccess("Success.login")
        localStorage.setItem("access", response.access)
        localStorage.setItem("refresh", response.refresh)
        localStorage.setItem("access-expiry", currentUnixTime + Number.parseInt(import.meta.env.VITE_ACCESS_EXPIRY))
        localStorage.setItem("email", loginEmail)
        setEmail(loginEmail)
        setTimeout(() => {
          navigate("/")
        }, 3500)
      }
    } catch (err) {
      setError(err.message || t("Error.login-failed"))
    } finally {
      setIsSubmitting(false)
    }
  }

  const toggleForm = () => {
    setIsLoginForm(!isLoginForm)
    setSearchParams({ form: isLoginForm ? "signup" : "login" })
    setError("")
  }

  return (
    <div className="mt-20 bg-background flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 flex justify-center gap-4">
          <button
            className={`px-4 py-2 rounded-lg shadow-lg transition-colors duration-200 ${
              isLoginForm ? "bg-gradient-blue text-white" : "bg-grey-dark text-white hover:bg-black"
            }`}
            onClick={() => !isLoginForm && toggleForm()}
          >
            {t("Auth.button-login")}
          </button>
          <button
            className={`px-4 py-2 rounded-lg shadow-lg transition-colors duration-200 ${
              !isLoginForm ? "bg-gradient-blue text-white" : "bg-grey-dark text-white hover:bg-black"
            }`}
            onClick={() => isLoginForm && toggleForm()}
          >
            {t("Auth.button-signup")}
          </button>
        </div>

        {isLoginForm ? (
          <form onSubmit={handleLogin} className="bg-grey-dark p-8 rounded-xl shadow-2xl">
            <h1 className="text-4xl font-bold mb-2 text-gradient-blue"
              style={{
                background: 'linear-gradient(180deg, var(--gradient-blue), var(--gradient-red))',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontFamily: '"Inter"',
                fontSize: '2.5rem',
                textDecoration: 'none !important',
                fontWeight: 'bold',
                textAlign: 'left',
                backgroundSize: '100% 50%', // This ensures the gradient resets on each line
                lineHeight: '1.2',
              }}
            >{t("Auth.login-message")}</h1>
            <p className="text-grey-lighter mb-8">{t("Auth.login-paragraph")}</p>
            <input
              className="w-full bg-grey-light text-white px-4 py-3 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-gradient-blue"
              type="email"
              name="email"
              autoComplete="email"
              placeholder={t("Auth.mail-address-placeholder")}
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
              required
            />
            <PasswordInput
              placeholder={t("Auth.password-placeholder")}
              name="password"
              autoComplete="current-password"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              required
            />
            <div className="flex items-center gap-4">
              {/* <button
                type="submit"
                className="flex-1 bg-gradient-blue text-white py-3 rounded-lg font-semibold hover:bg-high-gradient-blue transition-colors duration-200 disabled:opacity-50"
                disabled={isSubmitting}
              >
                
                {isSubmitting ? t("Auth.submitting") : t("Auth.button-login")}
              </button> */}
              <button
                  id="Home-AuthButton"
                  type="submit"
                  disabled={isSubmitting}
                  className="h-12 !outline-0 !text-2xl shadow-[0_0_10px_rgba(255,255,255,0.5)] hover:!shadow-[0_0_20px_rgba(255,255,255,0.8)] transition-shadow duration-300"
 
                >
              {isSubmitting ? t("Auth.submitting") : t("Auth.button-signup")}
            </button>
              <GoogleButton />
            </div>
          </form>
        ) : (
          <form onSubmit={handleSignup} className="bg-grey-dark p-8 rounded-xl shadow-2xl">
            <h1 
              style={{
                background: 'linear-gradient(180deg, var(--gradient-blue), var(--gradient-red))',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontFamily: '"Inter"',
                fontSize: '2.5rem',
                textDecoration: 'none !important',
                fontWeight: 'bold',
                textAlign: 'left',
                lineHeight: '1.2',
              }}
            className="text-4xl font-bold mb-2 text-gradient-blue">{t("Auth.signup-message")}</h1>
            <p className="text-grey-lighter mb-8">{t("Auth.signup-paragraph")}</p>
            <input
              className="w-full bg-grey-light text-white px-4 py-3 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-gradient-blue"
              type="email"
              name="email"
              autoComplete="email"
              placeholder={t("Auth.mail-address-placeholder")}
              value={signupEmail}
              onChange={(e) => setSignupEmail(e.target.value)}
              required
            />
            <PasswordInput
              placeholder={t("Auth.password-placeholder")}
              name="password"
              autoComplete="new-password"
              value={signupPassword}
              onChange={(e) => setSignupPassword(e.target.value)}
              required
            />
            <PasswordInput
              placeholder={t("Auth.re-password-placeholder")}
              name="re-password"
              autoComplete="new-password"
              value={signupConfirmPassword}
              onChange={(e) => setSignupConfirmPassword(e.target.value)}
              required
            />
            <div className="flex items-center mt-5 gap-4">
              {/* <button
                type="submit"
                className="flex-1 bg-gradient-blue text-white py-3 rounded-lg font-semibold hover:bg-high-gradient-blue transition-colors duration-200 disabled:opacity-50"
                disabled={isSubmitting}
              >
                {isSubmitting ? t("Auth.submitting") : t("Auth.button-signup")}
              </button> */}

              <button
                  id="Home-AuthButton"
                  type="submit"
                  disabled={isSubmitting}
                  className="h-12 !outline-0 !text-2xl shadow-[0_0_10px_rgba(255,255,255,0.5)] hover:!shadow-[0_0_20px_rgba(255,255,255,0.8)] transition-shadow duration-300"
 
                >
              {isSubmitting ? t("Auth.submitting") : t("Auth.button-signup")}
            </button>
              
              <GoogleButton />
            </div>
          </form>
        )}

        {error && (
          <div className="mt-4 bg-red-500/10 border border-red-500 text-red-500 p-4 rounded-lg flex items-center gap-2">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
            </svg>
            {error}
          </div>
        )}

        <div className="mt-6">
          <ResetPasswordButton />
        </div>
      </div>
    </div>
  )
}

