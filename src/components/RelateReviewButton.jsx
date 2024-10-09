import { useContext, useEffect, useState } from "react";
import { Context } from "../pages/Root";
import '../assets/RelateReviewButton.css';


export default function RelateReviewButton(props){
    const {customFetch} = useContext(Context);
    const [related, setRelated] = useState(null);
    const [disabled, setDisabled] = useState(false);

    useEffect(()=>{
      setRelated(props.related)
    },[props.related])

    const toggle = () => {
        // not using event param to make this usable by other functions
        let e = document.getElementById('RelateReviewButton-container')
        if (
          e.classList.contains(
            "RelateReviewButton-container-clicked"
          )
        ) {
          e.classList.remove("RelateReviewButton-container-clicked");
        } else {
          e.classList.add("RelateReviewButton-container-clicked");
        }
    }

    const relate = (value) =>{
        setRelated(value);
        setDisabled(true);
        customFetch(`/api/relatable/${props.id}`,
            {
                method: 'POST',
                body:{
                    'value':value
                }
            },
        )
        
        toggle();

        setTimeout(()=>{
            setDisabled(false);
        },2000)
    }
    
    return (
      <div id="RelateReviewButton-container">
        <div id="RelateReviewButton-preview" onClick={toggle}>
          {related == null ? (
            <>Vous n'avez pas opine sur cette review {`${related}`} </>
          ) : related == true ? (
            <>Vous êtes d'accord avec cette review</>
          ) : (
            <>Vous n’êtes pas d'accord avec cette review</>
          )}
        </div>
        <div id="RelateReviewButton-opened">
          <button disabled={disabled} onClick={() => relate(true)}>
            Etre d'accord
          </button>
          <button disabled={disabled} onClick={() => relate(false)}>
            Pas etre d'accord
          </button>
        </div>
      </div>
    );
}