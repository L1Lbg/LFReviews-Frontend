import { startTransition } from "react";
import { useEffect, useState } from "react";
import '../assets/TeacherStar.css'
export default function TeacherStar(props){
    const [stars, setStars] = useState(<></>)

    useEffect(() => {
        const rating = props.rating
        if(rating == undefined){
            return;
        }
        
        // Convert rating out of 10 to a 5-star scale
        const ratingOutOfFive = rating / 2;


        // Calculate the number of full and half stars
        const fullStars = Math.floor(ratingOutOfFive);
        const hasHalfStar = ratingOutOfFive % 1 !== 0;


        // Generate the star components
        const starsArray = [];
        for (let i = 0; i < fullStars; i++) {
          starsArray.push(<img src="/Icons/Star.svg" key={`full-${i}}`} />);
        }
        if (hasHalfStar) {
          starsArray.push(<img src="/Icons/HalfStar.svg" className='HalfStar' key="half" />);
        }

        setStars(starsArray);
    }, [props.rating]);
    
    return (
        <div className="TeacherStar" style={{'display':'flex'}}>
            {stars}
        </div>
    )
}