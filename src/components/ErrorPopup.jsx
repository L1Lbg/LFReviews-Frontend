import { useTranslation } from 'react-i18next';
import '../assets/Popup.css';

export default function ErrorPopup(props){
    const [t] = useTranslation('global');

    return (
        <div id='ErrorPopup' className='Popup'>
            <span>
                {t(`Error.${props.message.split('.').at(-1)}`)}
            </span>
        </div>
    )
}