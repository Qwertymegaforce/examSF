import React from 'react';
import { tds, determineAddHeaders, determineAddBodyButtons} from './mainpage_utils';
import MasterHeader from '../../mastertable/MasterHeader';
import MasterBody from '../../mastertable/MasterBody';
import { main_parse_by, machine_tabs_values, table_classes } from './mainpage_utils';
import { filterTableContent, sortTableContent } from '../../mastertable/mastertable_utils';


const ContentDiv = (props) => {

    if(props?.data?.length > 0)
    {
        let content = filterTableContent(props.data, props.filters, props.applyFilters)
        let sortedContent = sortTableContent(content, props.sorting, props.applySorting)
        return (
            <table
            className={`main_table ${table_classes[props.tab]}`}
            >
                <MasterHeader
                    headers = {tds[props.tab]}
                    additionalHeaders={[{title: "Подробнее"}].concat(determineAddHeaders(props.role, props.tab))}
                    exclude = {props.tab == machine_tabs_values.BRIEF && !props.token? ["Дата отгрузки с завода"] : null}
                    setState = {props.setState}
                    applySorting = {props.applySorting}
                />
                <MasterBody
                    data = {sortedContent}
                    parseBy = {main_parse_by[props.tab]}
                    addButtons = {determineAddBodyButtons(props.role, props.tab)}
                    enableFilters = {true}
                    setState = {props.setState}
                    applyFilters = {props.applyFilters}
                />
            </table>
        )
    }
    else 
    {
        return (<h1 className='no_data_sign'>По вашему запросу нет данных</h1>)
    }

}

export default ContentDiv;
