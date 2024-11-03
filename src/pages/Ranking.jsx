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


        </div>
    )
}