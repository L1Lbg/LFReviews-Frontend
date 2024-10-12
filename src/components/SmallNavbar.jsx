import { Link, useLocation, useNavigate } from "react-router-dom"
import '../assets/Navbar.css'
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Logout from "./Logout";
import { Context } from "../pages/Root";
export default function SmallNavbar(){
    const [t] = useTranslation('global')
    const { pathname } = useLocation();
    const [scrollY, setScrollY] = useState(0);
    const [showOthers, setShowOthers] = useState(true)
    const [lastTimeout, setLastTimeout] = useState(null)
    const { email } = useContext(Context);
    const [dropdownDisplay, setDropdownDisplay] = useState('none')
    const threshold = 300
    const navigate = useNavigate();

    const handleScroll = () => {
        setScrollY(window.scrollY);
    };




    const handleAuthClick = (e) => {
      let dropdown = document.querySelector('#Navbar-Auth-Dropdown')
      if(dropdownDisplay == 'block'){
        setDropdownDisplay('none')
      } else {
        setDropdownDisplay('block')
      }

    }

  // useEffect(() => {
  //   window.addEventListener('scroll', handleScroll);
  // }, []);

  // useEffect(() => {
  //   let navbar = document.getElementById('Navbar')
  //   let logo = document.getElementById('Navbar-Logo')
  //   clearTimeout(lastTimeout) 
  //   const navLinks = document.querySelectorAll('#Navbar > a, #Navbar > button');
  //   if(scrollY > threshold){ 
  //       if(window.outerWidth > 700){
  //         navLinks.forEach(link => {
  //           link.setAttribute('style', 'transform:translateY(-500px);');  
  //         });
  //       } else {
  //         navLinks.forEach(link => {
  //           link.setAttribute('style', 'transform:translateX(-1000px);');  
  //         });
  //       }
  //       logo.setAttribute(
  //         "style",
  //         "left: 50%;transform: translateX(-50%);"
  //       );

  //       setLastTimeout( 
  //           setTimeout(()=>{
  //               if(window.scrollY > threshold){
  //                   setShowOthers(false)
  //               }
  //           }, 1300)
  //       )

  //   } else { // make everything re-appear
  //     navbar.style.gridTemplateColumns = "1fr 1fr 1fr 1fr";
  //     logo.setAttribute('style', 'transform:translateX(0%) scale(1);');   
  //     setShowOthers(true)
  //     navLinks.forEach(link => {
  //         link.setAttribute('style', 'transform:translateY(0px) translateX(0px);');  
  //     });
  //   }
  // }, [scrollY, email]);

    return (
      <>
        <div id="Navbar-Logo-Container">
          {pathname == "/" ? (
            <img
              onClick={() => {
                window.scroll({ top: 0, behavior: "smooth" });
              }}
              className="Logo"
              id="Navbar-Logo"
              alt="LFMReviews Logo"
            />
          ) : (
            <img
                onClick={() => {
                navigate('/');
              }}
              className="Logo"
              id="Navbar-Logo"
              src=""
            />
          )}
        </div>
      
      
      
      <nav id="Navbar">
        
        {showOthers ? (
          <>
            <Link to="/communaute">{t("Navbar.community")}</Link>
            <Link to="/publication">{t("Navbar.publish")}</Link>

            {email == undefined ? (
              <>
                <Link to="/auth" id="Navbar-Auth">
                  <span
                    id="Navbar-Auth-Icon"
                    className="material-symbols-outlined"
                  >
                    account_circle
                  </span>
                </Link>
              </>
            ) : (
              <>
                <div onClick={handleAuthClick}>
                  <span
                    id="Navbar-Auth-Icon"
                    className="material-symbols-outlined"
                  >
                    account_circle
                  </span>
                  <div id="Navbar-Auth-Dropdown" style={{display:dropdownDisplay}}>
                    <Link to="/me" id="Navbar-Auth">{t('Navbar.profile')}</Link>
                    <br />
                    <Link to="/settings">{t('Navbar.settings')}</Link>
                    <br />
                    <Logout />
                  </div>
                </div>
              </>
            )}
          </>
        ) : (
          <></>
        )}
      </nav>
      </>
    );
}