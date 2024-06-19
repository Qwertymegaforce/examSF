import React from 'react';
import { useParams, useOutletContext } from 'react-router';
import { useNavigate } from "react-router-dom";
import MasterInputRender from "../masterinput/MasterInputRender";
import { HTTP, DOMAIN, API, VERSION, LIST, EDIT, DELETE } from '../../utils/paths';
import { edit_inputs_to_render } from './masteredit_utils';
import { redirectCheck, params_to_classes } from './masteredit_utils';
import { inputsDispatcher, validateState, formRequest, input_actions } from '../masterinput/master_utils';
import { infobook_types } from '../controlpanel/controlpanel_components/masterpanel_components/masterpanel_utils';
import MsgPopUp from './masteredit_components/MsgPopUp';
import MasterMsg from '../masterinput/MasterMsg';
import { logoutUser } from '../baselayout/baselayout_components/header_components/header_utils/header_utils';

const MasterEdit = () => {

    let params = useParams()
    let context = useOutletContext()
    let navigate = useNavigate()
    let token = context.accountState.token
    let role = context.accountState.role
    let checkRedirect = React.useRef(false)
    let [editState, setEditState] = React.useReducer(inputsDispatcher,{})
    let [bookState, setBooksState] = React.useState([])

    React.useEffect(()=> 
    {
        console.log('Запуск');
        if(checkRedirect.current)
        {
            if(redirectCheck(params.details, token, role))
            {
               navigate('/')
            }
        }
        checkRedirect.current = true
    }, [checkRedirect.current])

    React.useEffect(()=> 
    {
        if(checkRedirect.current && !context.accountState.token)
        {
            navigate('/')
        }
    }, [context.accountState.token])

    React.useEffect(()=>{
        if(params.details !== "infobook")
            {
            fetch(HTTP + DOMAIN + API + VERSION + LIST + "/infobook", {
                    headers: {
                        "Token" : token
                    }
                }
            )
            .then(res => res.json())
            .then(data => setBooksState(data))
        }
    }, [params.details])

    function editInstance(request){
        let request_body = formRequest(editState)
        request_body.append("id", params.id)
        fetch(HTTP + DOMAIN + API + VERSION + request + `/${params.details}` + `/${params.id}`, {
                method: request == EDIT? "PUT" : "DELETE",
                headers: {
                    "Token" : token
                },
                body: request_body
            }
        )
        .then(response => 
            {
                if(response.ok) return response.json()
                else return Promise.reject(response)

            }
        )
        .then(data => 
            {
                setEditState(
                    {
                        type: input_actions.CLEAR_STATE,
                        msg: data.info,
                        ...(request == DELETE && {details: true})
                    }
                )
            }
        )
        .catch(error =>
            {
                switch (error.status)
                {
                    case 404:
                        navigate('/')
                        break;
                    case 403:
                        logoutUser(context.setAccountState)
                        break;
                    default:
                        error.json()
                        .then(data => 
                            {
                                setEditState(
                                    {
                                        type: input_actions.FETCH_ERROR,
                                        msg: data.non_field_errors,
                                    }
                                )
                            }
                        )
                        break;
                }

            }
        )
    }

    return (
        <div className={`master_edit ${params_to_classes[params.details]}`}>
            <MasterInputRender
                list={edit_inputs_to_render[params.details]} 
                token={token}
                state={editState}
                setState={setEditState}
                dropList = {params.details == "infobook"? infobook_types : bookState}
                actualValue = {params.details == "infobook"? "value" : "id"}
            />
            <MsgPopUp settings = {editState?.msg} setState = {setEditState}/>
            <MasterMsg settings = {editState?.msg} preventShowing={editState?.msg?.details}/>
            <div className='edit_buttons_div'>
                <button
                    className={`basic_button ${validateState(editState, edit_inputs_to_render[params.details]?.length)? "inactive_button" : null}`}
                    onClick={()=>{editInstance(EDIT)}}
                >
                    Изменить запись
                </button>
                <button
                onClick={()=>{editInstance(DELETE)}}
                className='edit_del_button'
                >
                    Удалить запись
                </button>
            </div>
        </div>
        
    );
}

export default MasterEdit;
