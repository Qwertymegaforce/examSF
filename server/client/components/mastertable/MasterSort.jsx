import React from 'react';
import { sort_type_decoder } from '../mainpage/mainpage_components/mainpage_utils';
import crossIcon from '../../static/images/util_logos/cross.svg'

const MasterSort = (props) => {

    function setApplySorting(apply)
    {
        props.setState(prevState => 
            {
                return {
                    ...prevState,
                    applySorting: !apply
                }
            }
        )
    }

    function removeSelf()    
    {
        props.setState(prevState => 
            {
                return {
                    ...prevState,
                    sorting: null
                }
            }
        )
    }

    return (
        <div className='master_sort_div'>
            <h1>Сортировка</h1>
            <div className="sort_list">
                <div className='single_sort'>
                    <p>{props.sorting.title}: {sort_type_decoder?.[props.sorting.type]}</p>
                    <img src={crossIcon} 
                    onClick={props.applySorting? null : removeSelf}
                    className='cross_main_img' 
                    />
                </div>
            </div>
            <button 
            className={`basic_button main_sort_button`}
            onClick={()=>{setApplySorting(props.applySorting)}}
            >
                {props.applySorting? "Убрать сортировку" : "Применить сортировку"}
            </button>
        </div>
    );
}

export default MasterSort;
