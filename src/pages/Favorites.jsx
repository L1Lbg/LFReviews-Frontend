import { useContext, useEffect, useState } from "react"
import { Context } from "./Root"
import TeacherStar from '../components/TeacherStar'
import '../assets/Favorites.css';

export default function Favorites(){
    const { customFetch } = useContext(Context)
    const [reviews, setReviews] = useState([])
    
    const handleUnfavorite = (e, id) => {
        e.currentTarget.disabled = true
        customFetch(
            `/api/rating/${id}/favorite`,
            {
                method:'DELETE',
            }
        )
        .then(
            data => {
                setReviews(reviews.filter(review => review.id !== id))
            }
        )
    }


    useEffect(()=>{
        customFetch(
            '/auth/me/favorites',
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
        <div id="Favorites">
            <h1>
                Mes
                <span>Reviews</span>
                favories
            </h1>
            {
                reviews.map((review, index) => (
                    <div className="Favorites-Review" key={index}>
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
                        <button onClick={(e)=>handleUnfavorite(e, review.id)}>
                            <img src="/Icons/FilledHeart.svg" alt="Like" />
                        </button>
                        <br />
                    </div>
                ))
            }
        </div>
    )
}