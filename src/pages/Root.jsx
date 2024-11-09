import { Outlet, redirect, useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import SmallNavbar from '../components/SmallNavbar'
import Bottombar from "../components/Bottombar";
import React, { createContext, useEffect, useState } from "react";
import ErrorPopup from "../components/ErrorPopup";
import SuccessPopup from "../components/SuccessPopup";
import Maintenance from "./Maintenance";
import { useTranslation } from "react-i18next";

export const Context = createContext();

export default function Root(){
  let location = useLocation();
  const navigate = useNavigate();
  const noBottombar = ["/auth", "/admin"];
  const [t] = useTranslation('global')
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [email, setEmail] = useState(localStorage.getItem('email'));
  const [maintenance, setMaintenance] = useState(false);
  const [width, setWidth] = useState(window.innerWidth)

  //* custom fetch
  const customFetch = (url, options, auth) => {
    options["headers"] = {};
    if (auth !== false) {
      options["headers"]["Authorization"] = `Bearer ${localStorage.getItem(
        "access"
      )}`;
    }
    options["headers"]["Content-Type"] = "application/json";
    options["body"] = JSON.stringify(options["body"]);

    if(url[0] != '/'){
      url = '/' + url
    }

    url = `${import.meta.env.VITE_BACKEND_URL}${url}`


    return fetch(url, options).then(
      (res) => {
        if (res.status === 200 || res.status === 201) {
          return res.json();
        } else if (res.status === 204) {
          return { message: "Success" }; // for requests that only need an ok
        } else if (res.status === 400) {
          if (location.pathname != "/auth") {
            return { error: "error" };
          }
          return res.json();
        } else if (res.status === 401) {
          setEmail(undefined);
          localStorage.removeItem('email')
          if (location.pathname != "/auth") {
            navigate("/auth");
          } else {
            return res.json();
          }
        } else if (res.status === 404) {
          setError("404");
          setTimeout(() => {
            navigate("/");
          }, 3000);
          return {};
        } else if (res.status === 409) {
          // collision error
          setError("collision");
          return { error: "collision error" };
        } else if (res.status === 500) {
          // collision error
          setError("fatal");
          return { error: "fatal" };
        } else {
          return navigate("/");
        }
      }
    )
    .catch(
      e => {
        console.error(e)
        setError('fatal')
      }
    )
  };

  //*error popup
  useEffect(() => {
    if (error != "" || success.split(".")[0] == "Error") {
      let elem = document.getElementById("ErrorPopup");
      let duration = window
        .getComputedStyle(elem)
        .getPropertyValue("animation-duration")
        .split("s")[0];
      elem.classList.add("Popup-Animate");
      setTimeout(() => {
        elem.classList.remove("Popup-Animate");
        setError(""); // to reset the element
      }, duration * 1000);
    }
  }, [error]);

  //*success popup
  useEffect(() => {
    if (success != "" || success.split(".")[0] == "Success") {
      let elem = document.getElementById("SuccessPopup");
      let duration = window
        .getComputedStyle(elem)
        .getPropertyValue("animation-duration")
        .split("s")[0];
      elem.classList.add("Popup-Animate");
      setTimeout(() => {
        elem.classList.remove("Popup-Animate");
        setSuccess(""); // to reset the element
      }, duration * 1000);
    }
  }, [success]);

  //*refresh tokens automatically
  useEffect(() => {
    const currentUnixTime = Math.floor(Date.now() / 1000);
    
    // if user is not logged in
    if(localStorage.getItem('refresh') == null){
      console.info('No refresh needed: User not logged in')
      return;
    }


    // refresh 5 minutes before expiry
    if (currentUnixTime > localStorage.getItem("access-expiry") - 300) {
      console.info("Refreshing token...");

      customFetch(`/auth/token/refresh/`, {
        method: "POST",
        body: { refresh: localStorage.getItem("refresh") },
      }).then((data) => {
        const currentUnixTime = Math.floor(Date.now() / 1000);
        console.info("Successfully refreshed");
        localStorage.setItem("access", data.access);
        localStorage.setItem("refresh", data.refresh);
        localStorage.setItem(
          "access-expiry",
          currentUnixTime + parseInt(import.meta.env.VITE_ACCESS_EXPIRY)
        );
      });
    }
  },[]);


    addEventListener('resize', (e) =>{
      // console.log(window.innerWidth)
       setWidth(window.innerWidth)
    })


  //* block urls and change titles
  useEffect(()=>{
    if(location.pathname == '/auth' && email != undefined){
      navigate('/settings')
    }

    let trans = t(`Titles.${location.pathname.replace('/','')}`)

    if (trans.includes('Titles.')){
      trans = ' | ' + t('Titles.')
    } else {
      trans = ' | ' + trans
    }


    document.title = "LFMReviews" + trans

  },[location.pathname])

  useEffect(()=>{
    const date = new Date()
    const mseconds = date.getTime()
    const main_start = import.meta.env.VITE_MAINTENANCE_START
    const main_end = import.meta.env.VITE_MAINTENANCE_END

    if(main_start < (mseconds + 5*60*1000) && main_start > mseconds){
      setError('Global.maintenance')
    }

    //console.log(main_start < mseconds)
    //console.log(main_end > mseconds)
    if(main_start < (mseconds) && main_end > mseconds){ // 5 minutes ahead
      setMaintenance(true);
    }
  }, [])

  return (
      <Context.Provider
        value={{ customFetch, setError, setSuccess, email, setEmail }}
      >
        {
          width > 700 ? (
            <Navbar />
           ) : (
            <SmallNavbar />
           )
        }
        {
          maintenance ? (
            <Maintenance />
          ) : (
            <Outlet />
          )
        }
        {/* <CookiePopup /> */}
        <ErrorPopup message={error} />
        <SuccessPopup message={success} />
        {!noBottombar.includes(location.pathname) ? <Bottombar /> : <></>}
      </Context.Provider>
  );
};