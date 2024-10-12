import Review from "./Review";
import React, { useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react';
import AutoScroll from 'embla-carousel-auto-scroll';
import '../assets/embla.css';
import '../assets/CommunityCarousel.css';



const EmblaCarousel = (props) => {

    const [speed, setSpeed] = useState(1)

    useEffect(()=>{
        if(props.index % 2 == 0){
            setSpeed(1)
        } else {
            setSpeed(-1)
        }
    }, [])


  const [emblaRef, emblaApi] = useEmblaCarousel({ dragFree: true, loop: true }, [
    AutoScroll({ playOnInit: true, speed:speed, stopOnInteraction:false})
  ])

  useEffect(() => {
    if (!emblaApi) return
    const autoScroll = emblaApi?.plugins()?.autoScroll
    if (!autoScroll) return;
}, [emblaApi])

  return (
    <div className="CommunityCarousel">
        <div className="embla">
            <div className="embla__viewport" ref={emblaRef}>
                <div className="embla__container">
                {props.category?.reviews?.map((review, index) => (
                    <div className="embla__slide" key={index}>
                    <div className="embla__parallax">
                        <div className="embla__parallax__layer">
                            <Review
                                key={review.index}
                                review={review}
                                loading={props.loading}
                                community={props.community}
                                setCommunity={props.setCommunity}
                            />
                        </div>
                    </div>
                    </div>
                ))}
                </div>
            </div>
        </div>
    </div>
  )
}

export default EmblaCarousel;