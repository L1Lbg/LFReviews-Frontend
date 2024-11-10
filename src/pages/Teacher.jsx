import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import TeacherStar from "../components/TeacherStar";
import { useTranslation } from "react-i18next";
import { Context } from '../pages/Root'

export default function Teacher(){
    const {id} = useParams();
    const [t] = useTranslation('global')
    const [data, setData] = useState({})
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
                setData(data);
            }
        )
    },[])
    return (
        <div id="Teacher">
            {data.prefix} {data?.name}
            <br />
            {   
                data.rating != null ? (
                    <TeacherStar
                    rating={data.rating}
                    />
                ) : (
                    <>
                        {t('Teacher.no-rating')}
                    </>
                )
            }
            {
                data.subjects?.map((subject, index)=>(
                    <div key={index} style={{'border':`solid 1px ${subject.color}`}} className="Teacher-Subject">
                        {subject.name}
                    </div>
                ))
            }

            

        </div>
    )
}