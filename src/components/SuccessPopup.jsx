import { useTranslation } from 'react-i18next';
import '../assets/Popup.css';

export default function SuccessPopup(props){
    const [t] = useTranslation('global');

    return (
      <div id="SuccessPopup" className="Popup">
        <span>{t(`Success.${props.message.split(".").at(-1)}`)}</span>
      </div>
    );
}