import { useContext, useEffect, useState } from "react";
import TeacherStar from "./TeacherStar"
import { Context } from "../pages/Root";
import { useNavigate } from "react-router-dom";
import { CommunityContext } from "../pages/Community";
import FlagReview from "./FlagReview";
import FavoriteReview from "./FavoriteReview";
export default function Review(props){

    const {reviewState, setReviewState} = useContext(CommunityContext)
    const {customFetch, email} = useContext(Context)
    const [tempBlock, setTempBlock] = useState(false)
    const [scale, setScale] = useState('100%') // to make animations
    const [userRelated, setUserRelated] = useState()
    const [userLiked, setUserLiked] = useState(false)
    const like_url = './Icons/Like.svg'
    const liked_url = './Icons/Liked.svg'
    const dislike_url = './Icons/Dislike.svg'
    const disliked_url = './Icons/Disliked.svg'


    const [likeImgSrc, setLikeImgSrc] = useState(like_url)
    const [dislikeImgSrc, setDislikeImgSrc] = useState(dislike_url)
    const navigate = useNavigate()

    // change state every time reviewState is changed
    useEffect(()=>{
        setUserRelated(reviewState[props.review.id][0])
        setUserLiked(reviewState[props.review.id][1])
    }, [reviewState])


    // chandle UI changes when userRelated changes
    useEffect(()=>{
        if(userRelated == true){
            setLikeImgSrc(liked_url)
            setDislikeImgSrc(dislike_url)
        } else if(userRelated == null){
            setLikeImgSrc(like_url)
            setDislikeImgSrc(dislike_url)
        } else if(userRelated == false){
            setLikeImgSrc(like_url)
            setDislikeImgSrc(disliked_url)
        }
    }, [userRelated, reviewState])
    
    


    const handleRelate = (valueParam) => {
        if(tempBlock){
            return;
        }

        let value = valueParam;
        let method = 'POST';
        setScale('60%')


        //prevent un-authed users
        if(email == undefined){
            navigate('/auth')
            return;
        }
        
        // change value to null if button re-clicked
        if(value == userRelated){
            value = null
            method = 'DELETE'
        }

        setTempBlock(true)
        customFetch(
            `/api/relatable/${props.review.id}`,
            {
                method:method,
                body:{value:value}
            }
        )
        .then(
            data => {
                setScale('100%')
                setReviewState({
                    ...reviewState,
                    [props.review.id]: [
                        value,
                        ...reviewState[props.review.id].slice(1) // Keep the rest of the array as is
                    ]
                });
            }
        )
    }





    useEffect(()=>{
        if(tempBlock){
            setTimeout(()=>{
                setTempBlock(false)
            }, 2000)
        }
    }, [tempBlock])

    useEffect(()=>{
        let reviews = document.querySelectorAll('.Community-review')
        if(props.loading){
            reviews.forEach(review => {review.classList.add('Community-review-loading')})
        } else {
            reviews.forEach(review => {review.classList.remove('Community-review-loading')})
        }
    }, [props.loading])

    return (
        <div key={props.review.id} className='Community-review'>
            {
                !props.loading ? (
                    <>
                        <div className="Community-review-manage">
                            <FlagReview
                                id={props.review.id}
                            />
                            <FavoriteReview
                                id={props.review.id}
                                reviewState={reviewState}
                                setReviewState={setReviewState}
                            />

                        </div>
                        <TeacherStar
                            rating={props.review.tot_rating}
                        />
                        <ul>
                            <li><h3>{props.review.teacher?.prefix} {props.review.teacher?.name} | {props.review?.subject}</h3></li>
                        </ul>
                        <div className="Community-review-content">
                            <p>-"{props.review.text_rating}"</p>

                            <div className="Community-category-review-relatable">
                                <img style={{scale:scale}} src={likeImgSrc} alt="Like" onClick={()=>handleRelate(true)}/>
                                {
                                    props.review.relatable_count > 0 ? (
                                        <div>
                                            <progress value={props.review.relatable} max='100'/>
                                            <div><p>{props.review.relatable}%</p> <p>{100 - props.review.relatable}%</p></div>
                                        </div>
                                    ) : (
                                        <div>
                                            <progress value={props.review.relatable} max='100'/>
                                            <div><p>{props.review.relatable}%</p> <p>{100 - props.review.relatable}%</p></div>
                                        </div>
                                    )
                                }
                                <img style={{scale:scale}} src={dislikeImgSrc} alt="Dislike" onClick={()=>handleRelate(false)}/>
                                {
                                    props.review.relatable_count > 0 ? (
                                        <p className='Community-category-review-relatable-count'>({props.review.relatable_count})</p>
                                    ) : (
                                        <p className='Community-category-review-relatable-count'>(0)</p>
                                    )
                                }
                            </div>
                        </div>
                    </>
                ) : (
                    <></>
                )
            }
        </div>
    )
}