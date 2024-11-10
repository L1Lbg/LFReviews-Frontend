import { useContext, useEffect, useState } from "react";
import Root, { Context } from "../pages/Root";
import '../assets/Ranking.css'
import { useTranslation } from "react-i18next";

export default function Ranking(){
    const [teachers, setTeachers] = useState([]);
    const { customFetch } = useContext(Context)
    const [t] = useTranslation('global')
    
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
            <h1>
                {t('Ranking.title')}
            </h1>
            <ol>
                {
                    teachers.length > 0 ? (
                            teachers.map((teacher, index) => (
                                <li key={teacher.id}>
                                    <h3>{index+1}</h3>
                                    <h2>{teacher.prefix} {teacher.name}</h2>
                                    <span>
                                        {
                                            teacher.subjects.map((subject,index)=>(
                                                <p>
                                                    {subject}
                                                </p>
                                            ))
                                        }
                                    </span>
                                    <img src="/Icons/Star.svg" alt="Star" />
                                    <span>{parseFloat(teacher.rating).toFixed(1)}</span>
                                </li>
                            ))
                    ) : (
                        <>Loading...</>
                    )
                }
            </ol>
        </div>
    )
}