import { useContext, useEffect, useState } from "react";
import Root, { Context } from "../pages/Root";

export default function Ranking(){
    const [teachers, setTeachers] = useState([]);
    const { customFetch } = useContext(Context)
    
    useEffect(()=>{
        customFetch(`/api/teachers/ranking`, {
            method: 'GET',
        })
        .then(
            data => setTeachers(data)
        )
    },[]);
    
    return (
        <div id="Ranking">
            {
                teachers.length > 0 ? (
                        teachers.map((teacher) => (
                            <div key={teacher.id}>
                                <h2>{teacher.name}</h2>
                                <p>{teacher.rating}</p>
                            </div>
                        ))
                ) : (
                    <>Loading...</>
                )
            }


            {/* <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7504130752436386"
                crossOrigin="anonymous"></script>
            <ins className="adsbygoogle"
                style={{'display':'block'}}
                data-ad-client="ca-pub-7504130752436386"
                data-ad-slot="7907612549"
                data-ad-format="auto"
                data-full-width-responsive="true"></ins>
            <script>
                (adsbygoogle = window.adsbygoogle || []).push({});
            </script> */}
        </div>
    )
}