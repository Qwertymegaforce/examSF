import React from 'react';
import { types, input_actions } from './master_utils';
import arrowDownIcon from '../../static/images/util_logos/arrow_down.svg'
import DropItem from './DropItem';
import DropContent from './DropContent';
import DropUserContent from './DropUserContent';

const MasterInput = (props) => {
    switch(props.type){
        case types.CHARFIELD:
            return (
                <div className="char_input">
                    <input 
                        className= {`master_input ${props?.errors?.[0]? "incorrect_input": ''}`}
                        value={props.value? props.value : ''}
                        type={props.ispassword? "password" : "text"} 
                        placeholder={props.placeholder}
                        id={props.id}
                        onInput={(e)=>props.setState({
                            type: input_actions.SET_DATA,
                            id: e.target.id,
                            value: e.target.value
                        })}
                        onBlur={(e)=>props.setState({
                            type: input_actions.VALIDATE,
                            id: e.target.id,
                            value: e.target.value,
                            validators: props.validators,
                            reshufle: props?.reshufle,
                            inputList: props?.inputList,
                        })}
                        />
                    {props?.errors?.[0] && <p className='incorrect_sign'>{props.errors[1]}</p>}
                </div>
            )

        case types.DROPDOWN:
            return (
                <div className={`master_dropdown`}>
                    <input type="text" 
                        className='master_input master_input_dropdown'
                        placeholder={props.placeholder}
                        readOnly={true}
                        value={props.manualInput? props.manualInput: ""}
                    />
                    <img 
                        src={arrowDownIcon} 
                        onClick={()=>{
                            props.setState(
                                {
                                    type: input_actions.DISPLAYDROPDOWN,
                                    id : props.id
                                }
                            )
                        }}
                    />
                    <DropContent
                        actualValue={props.actualValue}
                        display = {props.display}
                        id = {props.id}
                        list = {props.dropChoice}
                        childClassname = {'dropitem'}
                        setState = {props.setState}
                        filterBy = {props.filterBy}
                    />
                </div>
            )

        case types.DATEFIELD:
            return (
                <div 
                    className={`date_input`}
                    
                >
                    <p>{props.placeholder}</p>
                    <input 
                        className={`master_input master_input_date ${props?.errors?.[0]? "incorrect_input": ""}`}
                        id={props.id}
                        type="date"     
                        value={props.value? props.value : ''}                
                        onInput={(e)=>props.setState({
                            type: input_actions.SET_DATA,
                            id: e.target.id,
                            value: e.target.value
                        })}
                        onBlur={(e)=>props.setState({
                            type: input_actions.VALIDATE,
                            id: e.target.id,
                            value: e.target.value,
                            validators: props.validators,
                            reshufle: props?.reshufle,
                            inputList: props?.inputList,
                        })}
                    />
                    {props?.errors?.[0] && <p className='incorrect_sign'>{props.errors[1]}</p>}
                </div>
            )

        case types.TEXTFIELD:
            return (
                <div className='text_input'>
                <textarea 
                    id={props.id}
                    className={`master_input master_textinput ${props?.errors?.[0]? "incorrect_input": ""}`}
                    style={
                        {
                            borderColor: props?.errors?.[0]? "var(--red-color)" : null
                        }
                    }
                    placeholder={props.placeholder}
                    value={props.value? props.value : ''}
                    onInput={(e)=>props.setState({
                        type: input_actions.SET_DATA,
                        id: e.target.id,
                        value: e.target.value
                    })}
                    onBlur={(e)=>props.setState({
                        type: input_actions.VALIDATE,
                        id: e.target.id,
                        value: e.target.value,
                        validators: props.validators
                    })}
                />
                 {props?.errors?.[0] && <p className='incorrect_sign'>{props.errors[1]}</p>}
                </div>
            )

        case types.CHOOSELINE:
            let lines = props.lines.map((item, index) => { 
                return (
                    <DropItem 
                        key={index} 
                        selectedValue={props.value} 
                        isLine={true} 
                        className={'line_item'} 
                        id={props.id} 
                        title={item.title} 
                        setState={props.setState} 
                        value={item.value}
                    />
                )
            })

            return (
                <div className="input_choiceline">
                    {lines}
                </div>
            )

        case types.USERINPUT:
            return (
                <div className="user_search">
                    <div className="user_search_header">
                        <div className="search_user_input">
                            <input 
                                type="text" 
                                id={props.id}
                                className='master_input'
                                placeholder={props.placeholder}
                                onInput={(e)=>props.setState({
                                    type: input_actions.SET_DATA,
                                    id: e.target.id,
                                    value: "",
                                    manual: e.target.value,
                                    noDisplay: false,
                                    nullifyValue: true
                                })}
                                value={props.manualInput? props.manualInput: ""}
                            />
                            <DropUserContent
                                id = {props.id}
                                actualValue = {''}
                                display = {props.display}
                                role = {props.role}
                                token = {props.token}
                                name = {props?.manualInput}
                                setState = {props.setState}
                            />
                        </div>
                        <div 
                            className="selected_user"  
                            style={{
                                backgroundColor: props.value? "var(--chosen-green)" : "var(--unchosen-grey)"
                            }}
                        >
                            <p>{props.value? props.manualInput : "Пользователь не выбран"}</p>
                        </div>
                    </div>
                </div>
            )

        default:
            return (
                <h1>Пока не готово</h1>
            )
    }
}

export default MasterInput;
