import React from 'react';
import { BRAND_YEAR } from '../../utils/constants';
import { HTTP, DOMAIN, API, VERSION, LOGIN } from '../../utils/paths';
import { useOutletContext, Navigate } from 'react-router-dom';
import MasterMsg from '../masterinput/MasterMsg';
import MasterInputRender from '../masterinput/MasterInputRender';
import { inputsDispatcher, validateState, formRequest, input_actions} from '../masterinput/master_utils';
import { auth_inputs } from './auth_utils';

const Auth = () => {

    let context = useOutletContext()

    if(context.accountState.token)
    {
        return <Navigate to={'/'}/>
    }

    const [loginData, setLoginData] = React.useReducer(inputsDispatcher, {})


    function authUser()
    {
        let request_body = formRequest(loginData)
            fetch(HTTP + DOMAIN + API + VERSION + LOGIN, {
                method : "POST",
                body: request_body
            }
        )
        .then(response => 
            {
                if (response.ok) return response.json()
                else 
                {
                    return Promise.reject(response)
                }
            }
        )
        .then(data => 
            {
                localStorage.setItem("silant_token", data.token)
                context.setAccountState(prevState => {
                        return {
                            ...prevState,
                            token: data.token
                        }
                    }
                )
            }
        )
        .catch(error => 
            {
                error.json()
                .then(jsonErr => 
                    {
                        setLoginData(
                            {
                                type: input_actions.FETCH_ERROR,
                                msg: jsonErr.info
                            }
                        )
                    }
                )
            }
        )
    }

    return (
        <div className='auth_component'>
            <div className='auth_decor_div'>
                <div className='auth_decor_black_box'>
                    
                </div>
            </div>
            <div className="auth_form_div">
                <h1>Авторизация</h1>
                <div className='auth_inputs_div'>
                    <MasterInputRender list={auth_inputs} setState={setLoginData} state={loginData}/>
                </div>
                <MasterMsg settings = {loginData?.msg}/>
                <div className='auth_button_div'>
                    <button 
                        onClick={authUser}
                        className={validateState(loginData, 2)? "inactive_button" : null}
                    >
                        Войти
                    </button>
                    <p>{BRAND_YEAR}</p>
                </div>
            </div>
        </div>
    );
}

export default Auth;
