import { useTranslation } from "react-i18next"
import '../assets/CompletedReview.css'
import { useNavigate } from "react-router-dom"
export default function CompletedReview(){
    const [t] = useTranslation('global')
    const navigate = useNavigate()
    const handleShare = () => {
        const queryParameters = new URLSearchParams(window.location.search)
        let id = queryParameters.get('id')
        navigator.share({
            title:'',
            text:'',
            url:`${import.meta.env.VITE_FRONTEND_URL}/review/${id}`
        })

    }

    return (
        <div id="CompletedReview">
            <h1>
                {t('CompletedReview.Title')} <span className="GradientReview">Review</span>!
            </h1>
            <div id="CompletedReview-Cards-Container">
                <div className="CompletedReview-Cards" onClick={()=> {navigate('/')}}>
                    <h2>
                        {t('CompletedReview.Back')}
                    </h2>
                    <img src="/Icons/Home.svg" alt="Home Icon" />
                </div>

                <div className="CompletedReview-Cards" onClick={()=> {navigate('/publication')}}>
                    <h2>
                        {t('CompletedReview.Another')} <span style={{'color':'#9E35FF'}}>Review</span>!
                    </h2>
                    <img src="/Icons/StarsCompletedReview.svg" alt="Stars" />
                </div>

                <div className="CompletedReview-Cards" onClick={handleShare}>
                    <h2>
                        {t('CompletedReview.Share')}
                    </h2>
                    <img src="/Icons/Share.svg" alt="Stars" />
                </div>
            </div>
        </div>
    )
}