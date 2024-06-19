import React from 'react';
import downArrow from "../../static/images/util_logos/arrow_down.svg"
import { sorting_types } from '../mainpage/mainpage_components/mainpage_utils';


const SortingButtons = (props) => {
    function setSorting(sortType){
        props.setState(prevState => {
            return {
                ...prevState,
                sorting: {
                    title: props.title,
                    type: sortType,
                    sortingField: props.sortingField
                }
            }
        })
    }
    return (
        <div className='sorting_buttons'>
            <button onClick={()=>{setSorting(sorting_types.ASCENDING)}}>
                <img src={downArrow} alt="" className='sorting_arrow sa_up'/>
            </button>
            <button onClick={()=>{setSorting(sorting_types.DESCENDING)}}>
                <img src={downArrow} alt="" className='sorting_arrow'/>
            </button>
        </div>
    )
}


const MasterHeader = (props) => {

    let headers = props.headers? props.headers : []

    if (props.exclude)
    {
        for (let item of props.exclude)
        {
            headers = headers.filter(innerheader => innerheader.title !== item)   
        }
    }

    if(props.additionalHeaders)
    {
        headers = headers.concat(props.additionalHeaders)
    }

    headers = headers.map((header, index) => {
        return (
            <th key={index}>
                <div className='header_cell'>
                    <p>{header.title}</p>
                    {header.sorting && !props.applySorting? <SortingButtons setState={props.setState} sortingField={header.sortingField} title={header.title}/> : null}
                </div>
            </th>
        )
    })

    return (
        <thead>
            <tr>
                {headers}
            </tr>
        </thead>
    );
}

export default MasterHeader;
