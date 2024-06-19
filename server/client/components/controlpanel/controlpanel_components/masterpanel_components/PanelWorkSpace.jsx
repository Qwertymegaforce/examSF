import React from 'react';
import { inputs_to_render, create_to_fetch } from './masterpanel_utils';
import { inputsDispatcher, validateState, input_actions, formRequest } from '../../../masterinput/master_utils';
import { slidertabs_choices } from '../sidebar_tabs/slider_tabs';
import MasterInputRender from '../../../masterinput/MasterInputRender';
import { infobook_types } from './masterpanel_utils';
import {HTTP, DOMAIN, API, VERSION, LIST} from "../../../../utils/paths";
import MasterError from '../../../masterinput/MasterMsg';
import { panel_workspace_classes } from './masterpanel_utils';


const PanelWorkSpace = (props) => {

    let [masterState, setMasterState] = React.useReducer(inputsDispatcher, {})
    let [bookState, setBooksState] = React.useState([])

    React.useEffect(()=>{
        if(props.currentTab==slidertabs_choices.TRUCKS){
            fetch(HTTP + DOMAIN + API + VERSION + LIST + "/infobook", {
                headers: {
                    "Token" : props.token
                }
            })
              .then(res => res.json())
              .then(data => setBooksState(data))
        }
        setMasterState({type: input_actions.CLEAR_STATE})
    }, [props.currentTab])


    function createInstance(){
        let request_body = formRequest(masterState)
        fetch(HTTP + DOMAIN + API + VERSION + create_to_fetch[props.currentTab], 
            {
                method: "POST",
                headers: {
                    "Token" : props.token
                },
                body: request_body
            }
        )
        .then(response=>
            {
                if(response.ok) return response.json()
                else return Promise.reject(response)
            }
        )
          .then(data => 
            {
                setMasterState(
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
                        setMasterState(
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
        <div 
            className={`master_panel_workspace ${panel_workspace_classes[props.currentTab]}`}
        >
            {   
                props.currentTab 
                    && 
                <>
                <MasterInputRender 
                    list={inputs_to_render[props.currentTab]} 
                    token={props.token}
                    state={masterState}
                    setState={setMasterState}
                    dropList = {props.currentTab==slidertabs_choices.INFOBOOKS? infobook_types : bookState}
                    actualValue = {props.currentTab==slidertabs_choices.INFOBOOKS? "value" : "id"}
                />
                <MasterError settings = {masterState?.msg}/>
                </>
            }
            <button
                className={`basic_button controlpanel_button ${validateState(masterState, inputs_to_render[props.currentTab]?.length)? "inactive_button" : null}`}
                onClick={createInstance}
            >
                Создать запись
            </button>
        </div>
    );
}

export default PanelWorkSpace;
