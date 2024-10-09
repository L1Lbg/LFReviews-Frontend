import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Context } from "../pages/Root";
import RelateReviewButton from "../components/RelateReviewButton";
import "../assets/Review.css";

export default function Review() {
  const [editing, setEditing] = useState(false);
  const { customFetch, setSuccess, setError } = useContext(Context);
  const [formDisabled, setFormDisabled] = useState(false)
  const [review, setReview] = useState({
    teacher: {},
    subject: {},
    year: "1",
    grades: {},
  });
  const [t] = useTranslation("global");
  const { id } = useParams();
  
  const toggleEditing = () => {
    if (editing) {
      setEditing(false);
    } else {
      setEditing(true);
    }
  };



  const handleSubmit = (e) => {
    e.preventDefault()
    setFormDisabled(true) 
    let grades = {}
    let review_grades = Object.keys(review.grades)

    
    for(let i=0;i<review_grades.length;i++){
      let gradename = review_grades[i]
      let value = e.target[gradename].value
      if(value == 'off'){
        value = false
      } else if(value == 'on'){
        value = true
      } else if(e.target[gradename].type == 'number'){
        value = parseInt(value)
      }
      grades[gradename] = value
    }
    
    if(JSON.stringify(review.grades) == JSON.stringify(grades)){
      setFormDisabled(false)
      console.error('ReviewFormIdentical')
      setError('ReviewFormIdentical');
      return;
    } 
    // else {
    //   console.log(JSON.stringify(review.grades))
    //   console.log(JSON.stringify(grades))
    // }
    

    customFetch(
      `/api/rating/${id}`,
      {
        method:'PUT',
        body:grades,
      }
    )
    .then(
      data => {
        setSuccess('ReviewEdit');
        setReview({...review, grades}) // update review visually
        setTimeout(()=>{
          setFormDisabled(false);
        },2000)
      }
    )
  }



  useEffect(() => {
    customFetch(`/api/rating/${id}`, {
      method: "GET",
    }).then((data) => {
      if (data.subject) {
        setReview(data);
      }
    });
  }, [id]);

  return (
    <div id="Review">
      <h1 style={{ border: `solid 1px ${review.subject?.color}` }}>
        {review.teacher?.name}
        &nbsp;&nbsp;-&nbsp;&nbsp;
        {review.subject?.name}
        &nbsp;&nbsp;-&nbsp;&nbsp;
        {t(`Year.${review.year}`)}
        &nbsp;&nbsp;-&nbsp;&nbsp;
        {review.is_creator ? (
          <button onClick={toggleEditing}>Toggle Editing</button>
        ) : (
          <RelateReviewButton id={id} related={review.user_reviewed} />
        )}
      </h1>

      <form id="Review-grades" onSubmit={handleSubmit}>
        {
          Object.keys(review.grades).map((grade) => (
          <div className="Review-Grade" key={grade}>
            {t(`CreateReview.${grade}`)}:
            {
              
                // if grade 
                !Number.isNaN(parseInt(review.grades[grade])) ? (
                          <>
                            {
                              editing ? (
                                <input
                                  defaultValue={review.grades[grade]}
                                  type="number"
                                  max={10}
                                  min={0}
                                  name={grade}
                                />
                              ) : (
                                <span>{review.grades[grade]}</span>
                              )
                            }
                            /10
                          </>
                
                ) : (
                      // if bool 
                      typeof review.grades[grade] == "boolean" ? (
                        <input
                          type="checkbox"
                          name={grade}
                          defaultChecked={review.grades[grade]}
                          disabled={!editing}
                        />
                      ) : ( // if text rating
                        editing ? (
                          <textarea defaultValue={review.grades[grade]} name={grade}/>
                        ) : (
                          <span>{review.grades[grade]}</span>
                        )
                      )
                  )
              }
            </div>
          ))}
            
            {
              editing ? (
                <button type="submit" disabled={formDisabled}>Submit</button>
              ) : (
                <></>
              )
            }
      </form>

    </div>
  );
}
