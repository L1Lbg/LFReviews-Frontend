import { useContext, useEffect, useState } from "react"
import { Context } from "./Root"
import '../assets/Me.css';
import { useNavigate } from "react-router-dom";

export default function Me(){
    const {customFetch} = useContext(Context);
    const [email, setEmail] = useState('');
    const [reviews, setReviews] = useState([]);
    const navigate = useNavigate();

    useEffect(()=>{
        customFetch(
            'auth/manage/users/me',
            {
                method: 'GET',
            }
        )
        .then(
            data => {
                setEmail(data.email)
                setReviews(data.reviews)
            }
        )
    },[])
    return (
        <div id="me">
            {email}
            <br /><br />
            {
                reviews.map(review => (
                    <div className="Me-Review" onClick={() => navigate(`/review/${review.id}`)}>
                        {review.prefix}&nbsp;
                        {review.teacher}
                        {review.rating}/10
                        <br />
                    </div>
                ))
            }
        </div>
    )
}