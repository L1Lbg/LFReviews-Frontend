import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './assets/main.css';
import Home from './pages/Home.jsx';
import Auth from './pages/Auth.jsx';
import Error from './pages/Error.jsx';
import Root from './pages/Root.jsx';
import CreateReview from './pages/CreateReview.jsx';
import Admin from './pages/Admin.jsx';
import global_en from './translations/en/global_en.json'
import global_fr from "./translations/fr/global_fr.json";
import global_es from "./translations/es/global_es.json";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Activate from './pages/Activate.jsx';
import Settings from './pages/Settings.jsx';
import ResetPassword from './pages/ResetPassword.jsx';
import Teacher from './pages/Teacher.jsx';
import Ranking from './pages/Ranking.jsx';
import Review from './pages/Review.jsx';
import Me from './pages/Me.jsx';
import Community from './pages/Community.jsx';


if ('serviceWorker' in navigator) {
   window.addEventListener('load', () => {
     navigator.serviceWorker.register('./service-worker.js')
    .then(registration => {
      //  console.log('SW registered: ', registration);
     }).catch(registrationError => {
       console.log('SW registration failed: ', registrationError);
     });
   });
 }


// set language
const ls_lang = localStorage.getItem('lang')
var lang = ''
if(ls_lang == null){
  let nav_lang = navigator.language.split("-")[0];
  lang = nav_lang;
  localStorage.setItem("lang", nav_lang);
} else {
  lang = ls_lang;
}

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    // the translations
    // (tip move them in a JSON file and import them,
    // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
    resources: {
      en: {
        global: global_en,
      },
      es: {
        global: global_es,
      },
      fr: {
        global: global_fr,
      },
    },
    lng: lang,
    fallbackLng: "fr",

    interpolation: {
      escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    },
  });



const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/auth",
        element: <Auth />,
      },
      {
        path: "/me",
        element: <Me />,
      },
      {
        path: "/publication",
        element: <CreateReview />,
      },
      // {
      //   path: "/teacher/:id",
      //   element: <Teacher />,
      // },
      {
        path: "/communaute",
        element: <Community />,
      },
      {
        path: "/admin",
        element: <Admin />,
      },
      {
        path: "/ranking",
        element: <Ranking />,
      },
      // {
      //   path: "/review/:id",
      //   element: <Review />,
      // },
      {
        path: "/settings",
        element: <Settings />,
      },
      {
        path: "/password/reset/confirm/:uid/:token/",
        element: <ResetPassword />,
      },
      {
        path: "/activate/:uid/:token/",
        element: <Activate />,
      },
    ],
    errorElement: <Error />,
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router}>
      <Root />
  </RouterProvider>
); 
