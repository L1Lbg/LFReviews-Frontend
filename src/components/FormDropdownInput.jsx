import { useContext, useEffect, useState } from "react";
import Cancel from "/Icons/Cancel.svg";
import '../assets/FormDropdownInput.css'
import TeacherStar from "./TeacherStar";
import { Context } from "../pages/Root";

export default function FormDropdownInput(props){
    const [values, setValues] = useState([])
    const [nameShown, setNameShown] = useState('');
    const [realId, setRealId] = useState(-1);
    const [requestTimeout, setRequestTimeout] = useState(null)
    const [inputAble, setInputAble] = useState(true)
    const [listClass, setListClass] = useState(
      "FormDropdownInput-List FormDropdownInput-ListClosed"
    );
    const { customFetch, setError } = useContext(Context); 
    const [inputDisabled, setInputDisabled] = useState(false);
    const requestInterval = 500
    const setSpecial = props.special_method;
    
    //* if it's a predefined list
    useEffect(()=>{
        if(props.options != undefined){
          setValues(props.options);
          setNameShown('');
          ableInput();
        }
    },[props.options])

    useEffect(()=>{
      if(nameShown == ''){
        ableInput();
      }
    },[nameShown])

    //* make queries and update results
    const handleChange = (e) => {
      setNameShown(e.target.value)
      if(props.name != 'teacher'){
        setListClass("FormDropdownInput-List");
      }
      clearTimeout(requestTimeout)
      setRequestTimeout(
        setTimeout(()=>{
          if (
            props.ressource != undefined &&
            !Number.isInteger(parseInt(e.target.value)) &&
              e.target.value.length > 1
          ) {
            customFetch(`/api${props.ressource}?query=${e.target.value}`, {
              method: "GET",
            })
            .then((data) => {
              if (typeof values == "object") {
                if(data.length > 0){
                  setListClass("FormDropdownInput-List");
                }
                if(!data.error){
                  setValues(data);
                } else{
                  setError('teacher-query');
                }
              }
            });
          }
        }, requestInterval)
      )
    }

    //* set values
    const handleClick = (e) => {
      
      let id = e.currentTarget.getAttribute("value")
      setRealId(id);
      setListClass("FormDropdownInput-List FormDropdownInput-ListClosed");
      setInputDisabled(true);
      setInputAble(false)
      if(props.name == 'teacher' && setSpecial != null){
        let value = values.find((teacher) => teacher.id == id);
        setSpecial(value["subjects"]);
        setValues([]);
        setNameShown(e.currentTarget.getAttribute("prefix") + ' ' +  e.currentTarget.getAttribute("name"));
      }
    }

    //* make input clickable again
    const ableInput = () => {
      setInputDisabled(false);
      setInputAble(true);
      setNameShown('');
      setRealId(-1);
      if (props.name == "teacher" && setSpecial != null){
        setValues([]);
        setSpecial([]);
      }  
    }

    //* when input is focused
    const inputFocus = () => {
      if(props.name != 'teacher'){
        setListClass("FormDropdownInput-List");
      }
    }
    //* when its not
    const inputBlur = () => {
      if(props.name != 'teacher'){
        setTimeout(()=>{
          setListClass("FormDropdownInput-List FormDropdownInput-ListClosed");
        }, 300)
        }
    }





    return (
      <div className="FormDropdownInput-Container">
        <label className="FormLabel" htmlFor={props.name}>
          -{props.label}
        </label>
        <div className="FormDropdownInput">
          {/* <i onClick={toggleList} className={arrowClass}></i> */}
          <input
            placeholder={props.placeholder}
            onChange={handleChange}
            value={nameShown}
            autoComplete="off"
            disabled={inputDisabled}
            onBlur={inputBlur}
            onFocus={inputFocus}
          />
          {inputAble ? (
            <></>
          ) : (
            <div onClick={ableInput} className="FormDropdownInput-Delete">
              <img src={Cancel} />
            </div>
          )}
        </div>
        <input name={props.name} type="hidden" value={realId} />
        <div className={listClass}>
          {values.map((value, index) => (
            <div
              className="FormDropdownInput-ListItem"
              onClick={handleClick}
              key={index}
              prefix={value?.prefix}
              name={value.name}
              value={value.id}
            >
              <span className="FormDropdownInput-ListItem-Span">
                {
                  props.name == 'teacher' ? (
                    <>
                      {value.prefix} {value.name}
                    </>
                  ) : (
                    <>
                      {value.name}
                    </>
                  )
                }
              </span>
              <div className="FormDropdownInput-ListItem-StarsContainer">
                <TeacherStar rating={value?.rating} />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
}