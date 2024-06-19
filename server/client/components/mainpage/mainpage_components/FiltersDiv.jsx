import React from 'react';
import MasterFilter from "../../mastertable/MasterFilter";

const FiltersDiv = (props) => {

    function setApplyFilters(apply)
    {
        props.setState(prevState => 
            {
                return {
                    ...prevState,
                    applyFilters: !apply
                }
            }
        )
    }

    let filters = props.filters.map((filter, index) => 
        {
            return (<MasterFilter key={index} setState={props.setState} filter={filter} applyFilters={props.applyFilters}/>)
        }
    )

    return (
        <div className='filters_div'>
            <h1>Фильтры</h1>
            <div className="filters_list">
                {filters && filters}
            </div>
            <button
            className='basic_button filters_button'
            onClick={()=>{setApplyFilters(props.applyFilters)}}
            >
            {props.applyFilters? "Убрать фильтры" : "Применить фильтры"}
            </button>
        </div>
    );
}

export default FiltersDiv;
