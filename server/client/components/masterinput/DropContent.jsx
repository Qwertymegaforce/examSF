import React from "react";
import DropItem from "./DropItem";


export default function DropContent(props){
                
    let content = props.list

    if(!content){
        return <></>
    }

    if (props.filterBy){
        content = content.filter(item => item.type == props.filterBy)
    }

    content = content.map((item, index) => <DropItem key={index} className={props.childClassname} id={props.id} title={item.title} setState={props.setState} value={item[props.actualValue]}/>)

    return (
    <div 
        className="master_dropdown_content"
        style={{display: props.display? "block" : "none"}}
    >
        {content}
    </div>
    )
}