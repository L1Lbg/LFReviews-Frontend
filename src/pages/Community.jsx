import '../assets/Community.css';
import { useTranslation } from "react-i18next";
import FormDropdownInput from '../components/FormDropdownInput';
import { useContext, useEffect, useState } from 'react';
import TeacherStar from '../components/TeacherStar';
import { Context } from './Root';
import Review from '../components/Review';
export default function Community(){
    const [t] = useTranslation('global')
    const [categories, setCategories] = useState([])
    const { customFetch } = useContext(Context);

    useEffect(()=>{
        customFetch(
            '/api/rating/community',
            {
                method:'GET'
            }
        )
        .then(
            data => {
                setCategories(data);
            }
        )
        
    }, [])

    


    return ( 
        <div id='Community'>
            <h1 id='Community-title'>
                {t('Community.title')}
            </h1>
            <div id="Community-input-container">
                <input type="text" id="Community-input" placeholder={t('Community.search')}/>
                <div id="Community-input-results">

                </div>
            </div>


            {
                categories.map((category,index) => (
                    category.reviews?.length < 3 ? (
                        <></>
                    ) : (
                        <div key={index} class='Community-category'>
                            <h2>{t(`Community.${category.title}`)}</h2>
                            <div className='Community-reviews'>
                            {
                                category.reviews?.map(review => (
                                    <Review
                                    key={review.id}
                                    review={review}
                                    />
                                ))
                            }
                            </div>
                        </div>
                    )
                ))
            }



        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7504130752436386"
            crossorigin="anonymous"></script>
        <ins className="adsbygoogle"
            style={{"display":"block"}}
            data-ad-format="fluid"
            data-ad-layout-key="-6t+ed+2i-1n-4w"
            data-ad-client="ca-pub-7504130752436386"
            data-ad-slot="8010853627"></ins>
        <script>
            (adsbygoogle = window.adsbygoogle || []).push({});
        </script>

            


        </div>
    )
}