import React from "react"
import { input_actions } from "./master_utils"


export default function DropItem(props){

    function setDrop(e){
        props.setState({
            type: input_actions.SET_DATA,
            id: props.id,
            value: props.value,
            manual: props.isLine? null : props.title,
            noDisplay: true
        })
    }

    let additional_classname = null

    if (props.selectedValue == props.value && props.isLine){
        additional_classname = "line_item_selected"
    }

    return (
        <p 
            className={`${props.className} ${additional_classname}`} 
            onClick={setDrop}
        >
            {props.title}
        </p>
    )
}