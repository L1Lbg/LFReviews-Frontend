import { useContext, useEffect, useState } from "react";
import TeacherStar from "./TeacherStar"
import { Context } from "../pages/Root";
export default function Review(props){

    const {customFetch} = useContext(Context)
    const [tempBlock, setTempBlock] = useState(false)

    const handleRelate = (valueParam) => {
        if(tempBlock){
            return;
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
                if(!data.error){
                    const like = document.querySelectorAll(`.Community-category-review-relatable-like-${props.review.id}`)
                    const dislike = document.querySelectorAll(`.Community-category-review-relatable-dislike-${props.review.id}`)

                    like.forEach((img) => {
                        img.src = './Icons/Like.svg'
                    })
                    dislike.forEach((img) => {
                        img.src = './Icons/Dislike.svg'
                    })
                    if(valueParam == true){
                        like.forEach((img) => {
                            img.src = './Icons/Liked.svg'
                        })
                    } else if(valueParam == false) {
                        dislike.forEach((img) => {
                            img.src = './Icons/Disliked.svg'
                        })
                    }
                } else {
                    console.error(data.error)
                }
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
                        <TeacherStar
                            rating={props.review.tot_rating}
                        />
                        <ul>
                            <li><h3>{props.review.teacher?.prefix} {props.review.teacher?.name} | {props.review?.subject}</h3></li>
                        </ul>
                        <div className="Community-review-content">
                            <p>-"{props.review.text_rating}"</p>

                            <div className="Community-category-review-relatable">
                                <img className={`Community-category-review-relatable-like-${props.review.id}`} src="./Icons/Like.svg" alt="Like" onClick={()=>handleRelate(true)}/>
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
                                <img className={`Community-category-review-relatable-dislike-${props.review.id}`} src="./Icons/Dislike.svg" alt="Dislike" onClick={()=>handleRelate(false)}/>
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