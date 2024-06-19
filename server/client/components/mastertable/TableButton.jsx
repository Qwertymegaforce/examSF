import React from 'react';
import { Link } from 'react-router-dom';
import { HTTP, DOMAIN, API, VERSION } from '../../utils/paths';


const TableButton = (props) => {

    function deleteItem(){
        fetch(HTTP + DOMAIN + API + VERSION + props.settings.link + `/${props.id}`, {
            method: "DELETE",
            headers: {
                "Token": props.context.token
            }
        })
          .then(res=>res.json())
          .then(data => props.settings.onFinish(props.context.tab, props.context.token, props.context.setState))
    }

    switch (props.settings.type){
        case "redirect":
            return (
                <Link to={props.settings.link + `/${props.id}`}>
                    <button>
                        {props.settings.title}
                    </button>
                </Link>
            );
        case "delete":
            return (
                <button onClick={deleteItem}>{props.settings.title}</button>
            )
    }

}

export default TableButton;
