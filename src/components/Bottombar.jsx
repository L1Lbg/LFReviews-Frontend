import "../assets/Bottombar.css";
import EmailIcon from     "/Icons/MailIcon.svg";
import InstagramIcon from "/Icons/InstagramIcon.webp";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from 'react-i18next';
export default function Bottombar() {
  const [style, setStyle] = useState({})
  const { pathname } = useLocation();
  const [t] = useTranslation('global')
  useEffect(()=>{
    if(document.documentElement.scrollHeight > document.documentElement.clientHeight){
      setStyle({
        'position':'static'
    })
    } else {
      setStyle({
        'position':'absolute',
        'width':'100%'
      })
    }
  }, [pathname])


  return (
    <div id="Bottombar" style={style}>
      <p>LFMReviews 2024</p>
      <div id="Bottombar-legal">
        <a href="/regles-de-la-communaute">{t('Bottombar.communityRules')}</a>
        <a href="/politique-des-cookies">{t('Bottombar.cookiePolicy')}</a>
        <a href="/politique-de-privacite">{t('Bottombar.privacyPolicy')}</a>
        <a href="/clause-non-responsabilite">{t('Bottombar.disclaimer')}</a>
        <a href="/securite-protection">{t('Bottombar.securityProtection')}</a>
        <a href="/conditions-service">{t('Bottombar.termsOfService')}</a>
      </div>
      <div id="Bottombar-links">
        <a
          title="Notre compte Instagram"
          target="_blank"
          href="https://www.instagram.com/lfmreviews/"
        >
          <img src={InstagramIcon} alt="Instagram icon"/>
        </a>
        <a
          target="_blank"
          href="mailto:help@lfmreviews.com"
          title="Notre compte mail"
        >
          <img src={EmailIcon} alt="Email icon" />
        </a>
        <a href='https://ko-fi.com/Z8Z314C967' target='_blank'><img style={{border:'0px', height:'30px', width:'120px'}} src='/Icons/kofi5.webp' border='0' alt='Buy Me a Coffee at ko-fi.com' /></a>
      </div>
    </div>
  );
}
