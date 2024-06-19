import React from 'react';
import { superusers } from './mainpage_utils';
import { CHECKSILANT } from '../../../utils/constants';
import { getMainPageData } from './mainpage_utils';
import { useNavigate } from 'react-router-dom';

function SuperUserDiv(props){
    return (
        <div className='authed_as_div'>
            <p>Вы вошли как {superusers[props.role]}</p>
        </div>
    )
}



const SearchDiv = (props) => {

    const navigate = useNavigate()
    function searchInfo(){
        props.avoidRequest.current = false
        navigate(`/${props.umn}`)
    }
    
    return (
        <div className='search_div_component'>
            <div className='search_div'>
                <h1>{CHECKSILANT}</h1>
                <div className='search_div_input'>
                    <input 
                        type="text" 
                        placeholder='Заводской номер'
                        className='master_input'
                        value = {props.umn? props.umn : ''}
                        onInput={(e)=>{props.setState(prevState=>{
                            return {
                                ...prevState,
                                umn: e.target.value
                            }
                        })}}
                        />
                    <button 
                    onClick={searchInfo}
                    className='basic_button'
                    >
                        Поиск
                    </button>
                </div>
                {[3,4].includes(props.role)? <SuperUserDiv role={props.role}/>: null}
            </div>
        </div>
    );
}

export default SearchDiv;
