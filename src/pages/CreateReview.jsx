import { useState, useContext } from 'react';
import '../assets/CreateReview.css';
import { Rating } from "@mui/material";
import { styled } from '@mui/material/styles';
import SvgIcon from '@mui/material/SvgIcon';
import FormDropdownInput from '../components/FormDropdownInput';
import FormCheckboxInput from '../components/FormCheckboxInput';
import FormGradeInput from '../components/FormGradeInput';
import Info from '/Icons/info.svg?url'
import {useTranslation} from 'react-i18next';
import { Context } from '../pages/Root'
import { useNavigate } from 'react-router-dom';


const StyledRating = styled(Rating)(({ theme }) => ({
  // '& .MuiRating-iconEmpty': {
  //   color: 'grey',
  //   opacity:'0.5'
  // },
  fontSize:'3rem'
}));

function StarIcon(props) {
  return (
    <SvgIcon {...props}>
      <svg width="361" height="340" viewBox="0 0 361 340" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g filter="url(#filter0_d_92_611)">
        <path d="M229.056 104.379L188.936 34.2179C185.855 29.4139 178.88 29.2872 175.628 33.9762L132.986 102.634C131.856 104.262 130.162 105.414 128.232 105.864L46.6266 120.506C40.8589 121.854 38.5043 128.783 42.2572 133.366L96.8482 193.159C98.155 194.755 98.7951 196.794 98.6348 198.85L88.2494 277.834C87.7996 283.606 93.4412 287.93 98.8986 285.995L175.47 254.443C177.293 253.797 179.289 253.833 181.088 254.545L256.463 288.857C261.846 290.989 267.641 286.873 267.401 281.087L259.891 201.778C259.805 199.718 260.519 197.704 261.883 196.157L318.609 138.385C322.526 133.942 320.424 126.931 314.709 125.375L233.689 107.78C231.777 107.259 230.126 106.047 229.056 104.379Z" fill="url(#paint0_linear_92_611)" fill-opacity="0.7"/>
        </g>
        <defs>
        <filter id="filter0_d_92_611" x="0.44043" y="0.535767" width="360.173" height="338.892" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
        <feFlood flood-opacity="0" result="BackgroundImageFix"/>
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
        <feOffset dy="10"/>
        <feGaussianBlur stdDeviation="20"/>
        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0"/>
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_92_611"/>
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_92_611" result="shape"/>
        </filter>
        <linearGradient id="paint0_linear_92_611" x1="178.681" y1="286.391" x2="181.301" y2="89.5765" gradientUnits="userSpaceOnUse">
        <stop stop-color="#FF3A40"/>
        <stop offset="1" stop-color="#366EFD"/>
        </linearGradient>
        </defs>
        </svg>
    </SvgIcon>
  );
}



export default function CreateReview(){
  const { customFetch, setError, setSuccess } = useContext(Context);
  const [years, setYears] = useState([ // make this so that it doesnt re-render when another input is changed
    { name: "Terminale", id: "0" },
    { name: "Premiere", id: "1" },
    { name: "Seconde", id: "2" },
    { name: "Troisieme", id: "3" },
    { name: "Quatrieme", id: "4" },
    { name: "Cinquieme", id: "5" },
    { name: "Sixieme", id: "6" },
  ])
  const navigate = useNavigate()
  const gradesInputs = [
    "clarte", "interaction_soutien",
    "gestion_temps", "gestion_colere", "amabilite", 
    "charge_travail","difficulte" 
  ]
  const boolInputs = [
    "ponctuel", "aide", "greves", "punitions", "justice","distraction"
  ]
  const [submitDisabled, setSubmitDisabled] = useState(false)
  const [t] = useTranslation('global')
    const [subjects, setSubjects] = useState([]);
    const [overall, setOverall] = useState(2.5); 
    const handleSubmit = (e) => {
        e.preventDefault()
        let body = {}

        for(let i=0;i<gradesInputs.length;i++){
          body[gradesInputs[i]] = e.target[gradesInputs[i]].value * 2
        }
        for(let i=0;i<boolInputs.length;i++){
          let val = e.target[boolInputs[i]].value == 'true'
          body[boolInputs[i]] = val
        }
        const teacher = e.target.teacher.value;
        const subject = e.target.subject.value;
        const year = e.target.year.value
        body['text_rating'] = e.target.text_rating.value
        body['teacher'] = teacher
        body['subject'] = subject
        body['year'] = year
        body['tot_rating'] = overall * 2


        //todo: sanitize
        if (teacher == -1) {
          setError("wrong-teacher");
          return;
        }
        if (subject == -1) {
          setError("wrong-subject");
          return;
        }
        if(year == -1){
          setError('wrong-year')
          return;
        }
        for (let i = 0; i < gradesInputs.length; i++) {
          let val = e.target[gradesInputs[i]].value * 2 

          if(val > 10 || val < 0){
            setError('incorrect-grade')
            return;
          }
        }
        if(overall * 2 > 10 || overall * 2 < 0){
          setError('incorrect-overall')
          return;
        }

        const regex = /^[[a-zA-Z0-9,\.?!']*$/;
        if(!regex.test(e.target.text_rating.value) && e.target.text_rating.value.trim() != ''){
          setError('text-rating-forbidden-characters')
          return;
        }
        


        setSubmitDisabled(true);
        customFetch(`/api/rating/0`,
          {
            method:'POST',
            body:body,
          }
        )
        .then(
          data => {
            if(data.message){
              // setSuccess(data.message);
              navigate(`/publication/complete?id=${data.id}`)
            } 
            setSubmitDisabled(false);
          }
        )
    }
    const handleOverallChange = (e) => {
      setOverall(parseFloat(e.target.value))
    }

    return (
      <div id="CreateReview">
        <h1 id="CreateReview-Title">
          {t('CreateReview.publication')} <br />
          {t('CreateReview.ofA')} <br />
          <span className="Logo">{t('CreateReview.review')}</span>
        </h1>
        <div id="CreateReview-Form-Container">
          <form id="CreateReview-Form" action="" onSubmit={handleSubmit}>
            <div className="FormContainer">
              <FormDropdownInput
                label={t('CreateReview.chooseTeacher')}
                name="teacher"
                ressource="/teachers"
                special_method={setSubjects}
                placeholder="Nom du professeur"
              />
              <FormDropdownInput
                label={t('CreateReview.selectSubject')}
                name="subject"
                options={subjects}
                placeholder="Matière"
              />
              <FormDropdownInput
                label={t('CreateReview.selectYear')}
                name="year"
                options={years}
                placeholder="Année scolaire"
              />
            </div>
            <h2 className="FormLabel">
              {t('CreateReview.startEvaluation')}
            </h2>
            <div id="FormGradeInput-Container" className="FormContainer">
              {gradesInputs.map((input) => (
                <FormGradeInput
                  label={t(`CreateReview.${input}`)}
                  name={input}
                  key={input}
                />
              ))}
            </div>

            <div className="FormContainer">
              <h2 className="FormLabel">
                {t('CreateReview.yesOrNoQuestions')}
              </h2>
              {boolInputs.map((input) => (
                <FormCheckboxInput
                  label={t(`CreateReview.${input}`)}
                  name={input}
                  key={input}
                />
              ))}
            </div>
            <div id="FormTextInput" className="FormContainer">
              <label className="FormLabel" htmlFor="text_rating">
                {t('CreateReview.optionalComment')}
              </label>
              <div>
                <textarea
                  placeholder={t('CreateReview.textPlaceholder')}
                  type="text"
                  name="text_rating"
                  maxLength="256"
                />
                <span title='Soyez respectueux'>
                  <img src={Info} alt="Information" />
                </span>
              </div>
            </div>

            <div id="FormOverallInput">
              <StyledRating 
                precision={0.5}
                defaultValue={2.5}
                name="simple-controlled"
                value={overall}
                onChange={handleOverallChange}
                icon={<StarIcon color="primary" fontSize='inherit'/>}
              />
            </div>

            <button
              id="Home-AuthButton"
              type="submit"
              disabled={submitDisabled}
            >
              {t('CreateReview.submit')}
            </button>
          </form>
        </div>

      </div>
    );
}