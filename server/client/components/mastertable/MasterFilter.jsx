import React from 'react';
import crossIcon from '../../static/images/util_logos/cross.svg'


const MasterFilter = (props) => {
    function removeSelf(){
        props.setState(prevState =>
            {
                let filtersArr = prevState.filters
                let deleteIndex = prevState.filters.indexOf(props.filter)
                filtersArr.splice(deleteIndex, 1)
                return {
                    ...prevState,
                    filters: filtersArr
                }
            }
        )
    }

    let result_string = ""

    for (let index = 0; index < props.filter.name.length ; index ++){
        let valueAdd = props.filter.decoder? props.filter.decoder(props.filter.name[index]) : props.filter.name[index]
        let postFix = props.filter.postFix? props.filter.postFix : ""
        result_string = result_string + `${index == 0? "" : ", "}` + valueAdd + postFix
    }

    return (
        <div className='filter_component'>
            <p>
                {`${props.filter.fieldName}: `} 
                
                {result_string}
            </p>
            <img src={crossIcon} 
            className='cross_main_img' 
            onClick={props.applyFilters? null : removeSelf}
            />
        </div>
    );
}

export default MasterFilter;
