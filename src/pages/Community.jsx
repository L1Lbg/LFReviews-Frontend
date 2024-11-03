import '../assets/Community.css';
import { useTranslation } from "react-i18next";
import { createContext, useContext, useEffect, useState } from 'react';
import { Context } from './Root';
import TeacherStar from '../components/TeacherStar';
import CommunityCarousel from '../components/CommunityCarousel';


export const CommunityContext = createContext();


export default function Community(){
    const [t] = useTranslation('global')
    const [categories, setCategories] = useState([])
    const { customFetch } = useContext(Context);
    const [teachers, setTeachers] =  useState([])
    const [inputFocus, setInputFocus] = useState(false);
    const [inputValue, setInputValue] = useState('')
    const [loading, setLoading] = useState(false)
    const [reviewState, setReviewState] = useState({})
    const [requestTimeout, setRequestTimeout] = useState(null)

    useEffect(()=>{
        customFetch(
            '/api/rating/community',
            {
                method:'GET'
            }
        )
        .then(
            data => {
                setCategories(data.slice(0, -1));
                setReviewState(data[data.length-1]);
            }
        )
        
    }, [])


    // useEffect(()=>{
    //     console.log(categories)
    //     console.log(reviewState)
    // }, [reviewState, categories])


    useEffect(()=>{
        const categories = document.querySelector('#Community-Categories-Container')
        const inputForm = document.querySelector('#Community-input-form')
        const input = document.querySelector('#Community-input')
        if(inputFocus){
            categories.style.opacity = 0
            inputForm.style.marginTop = '18vh'
            inputForm.style.width = '70vw'
        } else {
            categories.style.opacity = 1
            inputForm.style.marginTop = '0vh'
            inputForm.style.width = '50vw'
        }
    }, [inputFocus])

    useEffect(()=>{
        if(inputValue.length < 2){
            return;
        }

        clearTimeout(requestTimeout);
        setRequestTimeout(
            setTimeout(()=>{
                customFetch(
                    `/api/teachers?query=${inputValue}`, 
                    {
                        method: "GET",
                    }
                )
                .then((data) => {
                        setTeachers(data)
                    });
                }, 500)
            );
            
        }, [inputValue])


    const handleSpanClick = (id) => {
        setLoading(true)
        customFetch(
            `/api/teacher/${id}/reviews`,
            {
                method:'GET'
            }
        )
        .then(
            data => {
                setCategories(data.slice(0, -1))
                setTeachers([])
                setLoading(false)
                setReviewState(data[data.length-1]);
            }
        )
    }


    return ( 
        <div id='Community'>
            <h1 id='Community-title'>
                <span className='Logo'>Reviews </span>
                {t('Community.title')}
            </h1>
            <form id="Community-input-form" onFocus={()=>setInputFocus(true)} onBlur={()=>setInputFocus(false)} onSubmit={(e) => e.preventDefault()}>
                <input type="text" autocomplete="off" id="Community-input" placeholder={t('Community.search')}  value={inputValue} onChange={(e)=>setInputValue(e.target.value)} />

                <div id="Community-input-results">
                    {
                        teachers.map((teacher) => (
                            <span onClick={() => {handleSpanClick(teacher.id)}}>
                                {teacher.prefix}
                                {teacher.name}
                                <TeacherStar
                                    rating={teacher.rating}
                                />

                            </span>
                        ))
                    }
                </div>
            </form>


            <div id="Community-Categories-Container">
                    <CommunityContext.Provider
                        value={{reviewState, setReviewState}}
                    >
                        {
                            categories.map((category,index) => (
                                category.reviews?.length < 1 ? (
                                    <></>
                                ) : (
                                    <div key={index} class='Community-category'>
                                        <h2>{t(`Community.${category.title}`)}</h2>
                                        <CommunityCarousel
                                            category={category}
                                            loading={loading}
                                            index={index}
                                        />
                                    </div>
                                )
                            ))
                        }
                    </CommunityContext.Provider>
            </div>




            


        </div>
    )
}