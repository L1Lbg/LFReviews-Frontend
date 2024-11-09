import { useContext, useEffect, useState } from "react"
import { Context } from "./Root"
import TeacherStar from '../components/TeacherStar'
import '../assets/MyReviews.css';

export default function MyReviews(){
    const { customFetch } = useContext(Context)
    const [reviews, setReviews] = useState([])
    
    useEffect(()=>{
        customFetch(
            '/auth/me/reviews',
            {
                method: 'GET',
            }
        )
        .then(
            data=>{
                setReviews(data)
            }
        )
    }, [])
    
    return (
        <div id="MyReviews">
            <h1>
                Mes
                <span>Reviews</span>
            </h1>
            {
                reviews.map((review, index) => (
                    <div className="MyReviews-Review" key={index}>
                        <h2>{review.teacher.prefix}&nbsp;{review.teacher.name}</h2>
                        <br />
                        <TeacherStar rating={review.tot_rating}/>
                        <br />
                        <span>{review.created_at}</span>
                        <br />
                        <span>
                            <img src="/Icons/Like.svg" alt="Like" />
                            {review.relatable}%
                        </span>
                        <br />
                        <a href={`/review/${review.id}/edit`} target="_blank">
                            Editer
                            <img src="/Icons/Pencil.svg" alt="Edit" />
                        </a>
                    </div>
                ))
            }
        </div>
    )
}