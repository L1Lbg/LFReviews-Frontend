import '../assets/Community.css';
import { useTranslation } from "react-i18next";
import { createContext, useContext, useEffect, useState } from 'react';
import { Context } from './Root';
import TeacherStar from '../components/TeacherStar';
import CommunityCarousel from '../components/CommunityCarousel';
import Teacher from './Teacher';


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
    const [teacherData, setTeacherData] = useState(null) //* after single teacher was already queried

    //* do initial community fetch
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



    //* animate input
    useEffect(()=>{
        const categories = document.querySelector('#Community-Categories-Container')
        const inputForm = document.querySelector('#Community-input-form')
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

    //* make teacher query
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


    //* when clicked, get the reviews related to the teacher
    const handleSpanClick = (id) => {
        setLoading(true)
        //* query reviews
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
        
        //* query teacher data
        customFetch(
            `/api/teacher/${id}`,
            {
                method:'GET'
            }
        )
        .then(
            data => {
                console.log(data);
                setTeacherData(data);
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
                <input type="text" autoComplete="off" id="Community-input" placeholder={t('Community.search')}  value={inputValue} onChange={(e)=>setInputValue(e.target.value)} />

                <div id="Community-input-results">
                    {
                        teachers.map((teacher, index) => (
                            <span key={index} onClick={() => {handleSpanClick(teacher.id)}}>
                                {teacher.prefix} &nbsp;
                                {teacher.name}
                                <TeacherStar
                                    rating={teacher.rating}
                                />

                            </span>
                        ))
                    }
                </div>
            </form>

            {
                teacherData != null ? (
                    <div id='Community-TeacherContainer'>
                        <div>
                            <div id="Community-TeacherName">
                                <div>
                                    {teacherData.prefix} {teacherData.name}
                                </div>
                                {
                                    teacherData.subjects.map((subject)=>(
                                        <span>{subject.name} </span>
                                    ))
                                }
                            </div>

                            <div>
                                <div>
                                    <TeacherStar 
                                        rating={teacherData?.rating}
                                    />
                                    {parseFloat(teacherData?.rating).toFixed(1)}
                                </div>
                                <span>- {teacherData.reviews} Reviews</span>
                            </div>
                        </div>

                        <a target="_blank" href={`/publication?teacher=${teacherData.id}`}>{t('CreateReview.TeacherCTA')} {teacherData.prefix} {teacherData.name}</a>
                    </div>
                ) : (
                    <></>
                )
            }


            <div id="Community-Categories-Container">
                    <CommunityContext.Provider
                        value={{reviewState, setReviewState}}
                    >
                        {
                            categories.map((category,index) => (
                                category.reviews?.length < 1 ? (
                                    <></>
                                ) : (
                                    <div key={index} className='Community-category'>
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