import { useContext, useEffect, useState } from "react";
import TeacherStar from "./TeacherStar"
import { Context } from "../pages/Root";
export default function Review(props){

    const {customFetch} = useContext(Context)
    const [tempBlock, setTempBlock] = useState(false)

    const handleRelate = (value) => {
        if(!tempBlock){
            setTempBlock(true)
            customFetch(
                `/api/relatable/${props.review.id}`,
                {
                    method:'POST',
                    body:{value:value}
                }
            )
            .then(
                data => {
                    if(!data.error){
                        
                    } else {
                        console.error(data.error)
                    }
                }
            )
        }
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
                            <li><h3>{props.review.teacher?.prefix} {props.review.teacher?.name}</h3></li>
                        </ul>
                        <div className="Community-review-content">
                            <p>-"{props.review.text_rating}"</p>

                            <div className="Community-category-review-relatable">
                                <img src="./Icons/Like.svg" alt="Like" onClick={()=>handleRelate(true)}/>
                                {
                                    props.review.relatable_count > 0 ? (
                                        <div>
                                            <progress value={props.review.relatable} max='100'/>
                                            <div><p>{props.review.relatable}%</p> <p>{100 - props.review.relatable}%</p></div>
                                        </div>
                                    ) : (
                                        <></>
                                    )
                                }
                                <img src="./Icons/Dislike.svg" alt="Like" onClick={()=>handleRelate(false)}/>
                                {
                                    props.review.relatable_count > 0 ? (
                                        <p className='Community-category-review-relatable-count'>({props.review.relatable_count})</p>
                                    ) : (
                                        <></>
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