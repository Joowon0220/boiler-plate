import React, {useState} from 'react'
import {useDispatch} from 'react-redux';
import {registerUser} from '../../../_actions/user_action';
import Axios from 'axios';
import { withRouter } from 'react-router-dom';

function RegisterPage(props) {


    const dispatch = useDispatch();

    const [Email, setEmail] = useState("")
    const [Name, setName] = useState("")
    const [Password, setPassword] = useState("")
    const [ConfirmPassword, setConfirmPassword] = useState("")

    const onEmailHandler =(event) => {
        setEmail(event.currentTarget.value) //이메일 내가 입력한대로 쳐짐
    }

    const onNameHandler =(event) => {
        setName(event.currentTarget.value)
    }

    const onPasswordHandler =(event) => {
        setPassword(event.currentTarget.value)
    }

    const onConfirmPasswordHandler =(event) => {
        setConfirmPassword(event.currentTarget.value)
    }

    const onsubmitHandler = (event) => {
        event.preventDefault(); //로그인 버튼 눌렀을때 자동 리프레쉬 방지

        if(Password !== ConfirmPassword){
            return alert('비밀번호와 확인 비밀번호는 같아야 합니다.')
        }

        let body = {
            email: Email,
            password: Password,
            name: Name

        }

        dispatch(registerUser(body))
        .then(response => {
            if(response.payload.success){
                props.history.push("/login")
            }else{
                alert("Failed to sign up")
            }
        })

    }

    return (
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100vh'
        }}>
            <form style={{display: 'flex', flexDirection:'column'}}
                onSubmit={onsubmitHandler}
            >
                <label>Email</label>
                <input type="email" value={Email} onChange={onEmailHandler}/>
                <label>Name</label>
                <input type="text" value={Name} onChange={onNameHandler}/>
                <label>Password</label>
                <input type="password" value={Password} onChange={onPasswordHandler}/>
                <label>Confirm Password</label>
                <input type="password" value={ConfirmPassword} onChange={onConfirmPasswordHandler}/>

                <br/>
                <button>
                    회원가입
                </button>
            </form>
        </div>
    )
}

export default withRouter(RegisterPage)
