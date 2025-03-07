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
    const [teacherDisplay, setTeacherDisplay] = useState('flex')
    const { customFetch, setError } = useContext(Context); 
    const requestInterval = 500
    const setSpecial = props.special_method;

    //* if teacher is specified on URL
    useEffect(() => {
      if(props.name == 'teacher'){
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const teacher = urlParams.get('teacher')
        if(teacher == null){
          return;
        }

        customFetch(
          `/api/teacher/${teacher}`,
          {
            method: "GET",
          }
        )
        .then(
          data => {
            if(data.name){
              setNameShown(`${data.prefix} ${data.name}`)
              setRealId(teacher)
              setInputAble(false)
              setSpecial(data.subjects)
            }
          }
        )
      }
    },[])



    //* if it's a predefined list
    useEffect(()=>{
        if(props.options != undefined){
          setValues(props.options);
          setNameShown('');
          ableInput();

          if(props.options.length == 1){
            console.log(props.options)
            setRealId(props.options[0].id)
            setNameShown(props.options[0].name)
            setInputAble(false)
          }
        }
    },[props.options])

    useEffect(()=>{
      if(nameShown == ''){
        ableInput();
      }
    },[nameShown])

    //* make queries and update results
    const handleChange = (e) => {
      if(props.name != 'teacher'){
        setListClass("FormDropdownInput-List");
      }     
      // prevent user from typing in year and subject inputs, as it doesnt do anything 
      if(!['year','subject'].includes(props.name)){
        setNameShown(e.target.value)
      }
      
      
      clearTimeout(requestTimeout)
      setRequestTimeout(
        setTimeout(()=>{
          //* if input gets its results from api query
          if (
            props.ressource != undefined &&
            !Number.isInteger(parseInt(e.target.value)) &&
              e.target.value.length >= 1
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
      setNameShown(e.currentTarget.getAttribute("name"))
      setRealId(id);
      setListClass("FormDropdownInput-List FormDropdownInput-ListClosed");
      setInputAble(false)
      if(props.name == 'teacher' && setSpecial != null){
        let value = values.find((teacher) => teacher.id == id);
        setSpecial(value["subjects"]);
        setValues([]);
        console.log(e.currentTarget.getAttribute("prefix") + ' ' +  e.currentTarget.getAttribute("name"))
        setNameShown(e.currentTarget.getAttribute("prefix") + ' ' +  e.currentTarget.getAttribute("name"));
      }
    }

    //* make input clickable again
    const ableInput = () => {
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


    useEffect(()=>{
      if(props.name == 'teacher'){
        setTeacherDisplay('grid')
      } 
    }, [props.name])





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
            disabled={!inputAble}
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
            <>
              {
                index != 0 ? (
                  <hr className="FormDropDownInput-HR"/>
                ) : (
                  <></>
                )
              }
              <div
                className="FormDropdownInput-ListItem"
                onClick={handleClick}
                key={index}
                prefix={value?.prefix}
                name={value.name}
                value={value.id}
                style={{
                  display:teacherDisplay
                }}
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
                
                {
                  value?.rating != null ? (
                    <div className="FormDropdownInput-ListItem-StarsContainer">
                    <TeacherStar rating={value?.rating} />
                  </div>
                  ) : (
                    <></>
                  )
                }

              </div>
            </>
          ))}
        </div>
      </div>
    );
}