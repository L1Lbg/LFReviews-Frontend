import '../assets/FormGradeInput.css'
export default function FormGradeInput(props){
    return (
      <div className="FormGradeInput" key={props.name}>
        <label className="num-label" htmlFor={props.name}>
          {props.label}
        </label>
        <span>
          
          <select name={props.name} className='FormGradeInput-Select'>
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
          /5
        </span>
      </div>
    );
}