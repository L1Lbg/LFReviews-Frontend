import { useState, useContext } from 'react';
import '../assets/CreateReview.css';
import { Rating } from "@mui/material";
import FormDropdownInput from '../components/FormDropdownInput';
import FormCheckboxInput from '../components/FormCheckboxInput';
import FormGradeInput from '../components/FormGradeInput';
import Info from '/Icons/info.svg?url'
import {useTranslation} from 'react-i18next';
import { Context } from '../pages/Root'

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
  const gradesInputs = [
    "clarte", "interaction_soutien", "methodes", "justice",
    "gestion_temps", "gestion_colere", "amabilite", 
    "charge_travail", "distraction", "difficulte", 
  ]
  const boolInputs = [
    "ponctuel", "aide", "greves", "punitions"
  ]
  const [submitDisabled, setSubmitDisabled] = useState(false)
  const [t] = useTranslation('global')
    const [subjects, setSubjects] = useState([]);
    const [overall, setOverall] = useState(2.5); 
    const handleSubmit = (e) => {
        e.preventDefault()
        setSubmitDisabled(true)
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
        console.log(e.target.text_rating.value)
        body['text_rating'] = e.target.text_rating.value
        body['teacher'] = teacher
        body['subject'] = subject
        body['year'] = year
        body['tot_rating'] = overall * 2


        //todo: sanitize
        if (teacher == -1) {
          setError("wrong-teacher");
          setSubmitDisabled(false);
          return;
        }
        if (subject == -1) {
          setError("wrong-subject");
          setSubmitDisabled(false);
          return;
        }
        if(year == -1){
          setError('wrong-year')
          setSubmitDisabled(false);
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

        //
        customFetch(`/api/rating/0`,
          {
            method:'POST',
            body:body,
          }
        )
        .then(
          data => {
            if(data.message){
              setSuccess(data.message);
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
              />
              <FormDropdownInput
                label={t('CreateReview.selectSubject')}
                name="subject"
                options={subjects}
              />
              <FormDropdownInput
                label={t('CreateReview.selectYear')}
                name="year"
                options={years}
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
              <Rating
                precision={0.5}
                defaultValue={2.5}
                name="simple-controlled"
                value={overall}
                onChange={handleOverallChange}
                icon={<img src='./Icons/Star.svg'/>}
              />
            </div>

            <button
              id="CreateReview-Submit"
              type="submit"
              disabled={submitDisabled}
            >
              {t('CreateReview.submit')}
            </button>
          </form>
        </div>

        <div id="CreateReview-AdContainer">
            <script
              async
              src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7504130752436386"
              crossOrigin="anonymous"
            ></script>
            <ins
              className="adsbygoogle"
              style={{ display: "block" }}
              data-ad-client="ca-pub-7504130752436386"
              data-ad-slot="5281449208"
              data-ad-format="auto"
              data-full-width-responsive="true"
            ></ins>
            <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
        </div>
      </div>
    );
}