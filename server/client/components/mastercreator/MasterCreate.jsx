import React from 'react';
import { useParams, useOutletContext } from 'react-router';
import { form_input_field } from './master_create_utils';
import { inputsDispatcher, validateState, formRequest, input_actions } from '../masterinput/master_utils';
import MasterInputRender from '../masterinput/MasterInputRender';
import { HTTP, DOMAIN, API, VERSION, LIST } from '../../utils/paths';
import { details_to_fetch } from './master_create_utils';
import { logoutUser } from '../baselayout/baselayout_components/header_components/header_utils/header_utils';
import { Navigate } from 'react-router-dom';
import MasterMsg from '../masterinput/MasterMsg';

const MasterCreate = (props) => {

    let params = useParams()
    let context = useOutletContext()

    let [creationState, setCreationState] = React.useReducer(inputsDispatcher, {})

    let [bookState, setBooksState] = React.useState([])
    let token = context.accountState.token

    React.useEffect(()=>
    {
        if(params.details !== "infobook")
        {
            fetch(HTTP + DOMAIN + API + VERSION + LIST + "/infobook",
                {
                    headers: {
                        "Token" : token
                    }
                }
            )
            .then(res => res.json())
            .then(data => setBooksState(data))
        }
    }, [])

    if(!context.accountState.token)
    {
        return (<Navigate to={'/'}/>)
    }

    function createInstance(){
        let request_body = formRequest(creationState)
        request_body.append("id", params.id)
        fetch(HTTP + DOMAIN + API + VERSION + details_to_fetch?.[params.details], 
            {
                headers: {
                    "Token" : token
                },
                method: "POST",
                body: request_body
            }
        )
        .then(response => 
            {
                if(response.ok) return response.json()
                else if (response.status == 403) logoutUser(context.setAccountState)
                else return Promise.reject(response)
            }
        )
        .then(data => 
            {
                setCreationState(
                    {
                        type: input_actions.CLEAR_STATE,
                        msg: data.info
                    }
                )
            }
        )
        .catch(error => 
            {
                error.json()
                .then(data => 
                    {
                        setCreationState(
                            {
                                type: input_actions.FETCH_ERROR,
                                msg: data.non_field_errors
                            }
                        )
                    }
                )
            }
        )
    }

    return (
        <div className='master_create_component'>
            <MasterInputRender 
                list={form_input_field[params.details]} 
                token={token}
                state={creationState}
                setState={setCreationState}
                dropList = {bookState}
                actualValue = {"id"}
            />
            <MasterMsg settings = {creationState?.msg}/>
            <button
                className={`basic_button ${validateState(creationState, form_input_field[params.details]?.length)? "inactive_button" : null}`}
                onClick={createInstance}
            >
                Создать запись
            </button>
        </div>
        
    );
}

export default MasterCreate;
