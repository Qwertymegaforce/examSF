import React from 'react';
import TableButton from './TableButton';

const MasterBody = (props) => {

    function addFilter(item, value){
        props.setState(prevState => {
            let filters = prevState.filters
            let element = filters.find(element => element.filteringField == item.value[0])
            if(!element)
            {
                filters.push({filteringField : item.value[0], name: [value], parsers: item.value, decoder: item.decoder, fieldName: item.fieldName, postFix: item.postFix})
            }
            else 
            {
                if(!element.name.includes(value))
                {
                    let index = filters.indexOf(element)
                    let nameArr = element.name
                    nameArr.push(value)
                    element = {
                        ...element,
                        name: nameArr
                    }
                    filters.splice(index, 1, element)
                }
            }
            return {
                ...prevState,
                filters: filters
            }
        })
    }

    let bodyContent = []

    bodyContent = props.data.map((item, index) => {
        let return_result = []
        let parseValue 
        for (let i = 0; i < props.parseBy.length; i++){
            for (let parser of props.parseBy[i].value){
                if (!parseValue) parseValue = item?.[parser]
                else parseValue = parseValue?.[parser]
            }
            if(!parseValue) continue
            let addValue = parseValue
            return_result.push(
                <td key={i}>
                    <div className='table_cell'>
                        <p>{props.parseBy[i]?.decoder? props.parseBy[i].decoder(parseValue) : parseValue}</p>
                        {props.enableFilters && !props.applyFilters? 
                        <button onClick={()=>addFilter(props.parseBy[i], addValue)}>Фильтровать</button> 
                        : 
                        null}
                    </div>
                </td>
            )
            parseValue = null
        }
        if (props?.addButtons){
            let b_index = props.parseBy.length
            for(let button of props.addButtons){
                return_result.push(
                    <td key={b_index}>
                        <div className='table_cell'>
                            <TableButton 
                                settings={button} 
                                id={item.id} 
                                context = {props?.context}
                            />
                        </div>
                    </td>)
                b_index ++
            }
        }
        return (<tr key={index}>{return_result}</tr>)
    })
    

    return (
        <tbody>
           {bodyContent} 
        </tbody>
    );
}

export default MasterBody;
