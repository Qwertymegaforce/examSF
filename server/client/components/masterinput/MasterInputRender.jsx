import React from 'react';
import MasterInput from './MasterInput';

const MasterInputRender = (props) => {

    let inputs = props.list.map((input, index) => {

        return (
            <MasterInput 
                key = {index}
                actualValue={props.actualValue}
                type = {input.type}
                value = {props.state?.[input.id]?.value}
                inputList = {props.list}
                display = {props.state?.[input.id]?.display}
                placeholder = {input?.placeholder}
                reshufle = {input?.reshufle}
                lines = {input?.lines}
                id = {input.id}
                token={props?.token}
                role = {input?.role}
                validators = {input?.validators}
                ispassword = {input?.ispassword}
                errors = {props.state?.[input.id]?.errors}
                setState = {props.setState}
                dropChoice = {props?.dropList}
                filterBy = {input?.filterBy}
                manualInput = {props.state?.[input.id]?.manualInput}
            />
        )
    })
    return (
        <>
            {inputs} 
        </>
    );
}

export default MasterInputRender;
