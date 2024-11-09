import { useContext, useEffect, useState } from "react"
import { Context } from "../pages/Root"

export default function FavoriteReview(props){
    const [imgSrc, setImgSrc] = useState('/Icons/EmptyHeart.svg')
    const { customFetch } = useContext(Context);
    const [userLiked, setUserLiked] = useState(false)
    const [disabled, setDisabled] = useState(false)

    useEffect(()=>{
        if(userLiked){
            setImgSrc('/Icons/FilledHeart.svg')
        } else {
            setImgSrc('/Icons/EmptyHeart.svg')
        }
    }, [userLiked])


    useEffect(()=>{
        setUserLiked(props.reviewState[props.id][1])
    }, [props.reviewState])


    const handleClick = (e) => {
        setDisabled(true)
        customFetch(
            `/api/rating/${props.id}/favorite`,
            {
                method: "POST",
                body:{
                    value:!userLiked
                }
            }
        )
        .then(
            data => {
                setDisabled(false)
                props.setReviewState({
                    ...props.reviewState,
                    [props.id]: [
                        props.reviewState[props.id][0], // Keep the rest of the array as is
                        !userLiked,
                    ]
                });
            }
        )
    }
    return (
        <button disabled={disabled} onClick={handleClick} className="FlagReview">
            <img src={imgSrc} alt="" />
        </button>
    )
}