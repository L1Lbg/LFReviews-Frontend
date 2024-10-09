import { useNavigate, useParams } from "react-router-dom"
import PasswordInput from "../components/PasswordInput";
import { Context } from '../pages/Root'
import { useContext } from "react";
export default function ResetPassword(){
    const {uid, token} = useParams();
    const { customFetch } = useContext(Context);
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();

        const new_password = e.target.children[0].children[0].value;
        const re_new_password = e.target.children[1].children[0].value;

        customFetch(`/auth/manage/users/reset_password_confirm/`,
            {
                method: 'POST',
                body:{
                    uid: uid,
                    token: token,
                    new_password: new_password,
                    re_new_password: re_new_password
                }
            }
        )
        .then(
            data => {
              navigate('/auth')
            }
        )

    }
    
    return (
      <>
        <form action="*" onSubmit={handleSubmit}>
          <PasswordInput
            new_password={true}
            name="new_password"
            placeholder=""
          />
          <PasswordInput
            new_password={true}
            name="re_new_password"
            placeholder=""
          />
          <button type="submit">Submit</button>
        </form>
      </>
    );
}