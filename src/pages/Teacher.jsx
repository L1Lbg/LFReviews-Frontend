import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import TeacherStar from "../components/TeacherStar";
import { useTranslation } from "react-i18next";
import { Context } from '../pages/Root'

export default function Teacher(){
    const {id} = useParams();
    const [t] = useTranslation('global')
    const [name, setName] = useState('')
    const [rating, setRating] = useState(0)
    const [subjects, setSubjects] = useState([]);
    const { customFetch } = useContext(Context); 
    
    useEffect(()=>{
        customFetch(
            `/api/teacher/${id}`,
            {
                method: 'GET',
            }
        )
        .then(
            data => {
                setName(data.name);
                setSubjects(data.subjects);
                setRating(data.rating)
            }
        )
    },[])
    return (
        <div id="Teacher">
            {name}
            <br />
            {   
                rating != null ? (
                    <TeacherStar
                    rating={rating}
                    />
                ) : (
                    <>
                        {t('Teacher.no-rating')}
                    </>
                )
            }
            {
                subjects.map((subject)=>(
                    <div style={{'border':`solid 1px ${subject.color}`}} className="Teacher-Subject">
                        {subject.name}
                    </div>
                ))
            }

        </div>
    )
}