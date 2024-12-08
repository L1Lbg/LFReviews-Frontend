import { useTranslation } from 'react-i18next';
import '../assets/FormCheckboxInput.css';
import CustomSelect from './CustomSelect';

export default function FormCheckboxInput(props){
  const [t] = useTranslation('global')
    return (
      <div className="FormCheckboxInput-Container">
        <label htmlFor={props.name}>{props.label}</label>
        <span></span>
        {/* <input type="checkbox" name={props.name} /> */}
        {/* <select name={props.name}>
          <option value={true}>{t('Global.yes')}</option>
          <option value={false}>{t('Global.no')}</option>
        </select> */}
        <CustomSelect
          name={props.name}
          label={props.label}
        />
      </div>
    );
}