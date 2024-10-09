import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Error() {
  let navigate = useNavigate();
  useEffect(()=>{
    setTimeout(()=>{
      navigate("/");
    }, 3000)
  },[])
  return <>Error</>;
}
