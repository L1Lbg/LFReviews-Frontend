import { useContext, useEffect, useState } from "react"
import { Context } from "../pages/Root";
import '../assets/FlagReview.css';
import { useTranslation } from "react-i18next";
export default function FlagReview(props){
    const { customFetch } = useContext(Context);
    const [modalOpen, setModalOpen] = useState(false)
    const [t] = useTranslation('global');
    useEffect(()=>{
        console.log(modalOpen)
        const modal = document.getElementById(`FlagReview-${props.id}`).lastElementChild.firstElementChild
        if(modalOpen == true){
            modal.showModal()
        } else {
            modal.close()
        }
    }, [modalOpen])

    const handleSubmit = (e) => {
        e.preventDefault();
        customFetch(
            `/api/rating/${props.id}/report`,
            {
                method: "POST",
                body:{
                    'content':e.currentTarget.content.value
                }
            }
        )
        .then(
            setModalOpen(false)
        )
    }
    return (
        <div id={`FlagReview-${props.id}`}  className="FlagReview">
            <img src="/Icons/Flag.svg" alt="Flag Request" onClick={()=>{setModalOpen(true)}}/>
            <div className="FlagReview-dialog">
                <dialog>
                    <form action="POST" onSubmit={handleSubmit}>
                        <button type="button" onClick={(e)=>{setModalOpen(false)}}>
                            <img src="/Icons/Close.svg" alt="Close"/>
                        </button>
                        <textarea type="text" name="content" maxLength={512}/>
                        <button type="submit">{t('Global.Submit')}</button>
                    </form>

                </dialog>
            </div>
        </div>
    )
}