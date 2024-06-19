import React from "react";
import UserParser from "./UserParser";
import InfoBookParser from "./InfoBookParser";
import {dateDecoder} from '../../../mainpage/mainpage_components/mainpage_utils';

export const unique_number_adder = {
    'model': "umn",
    "engine": "uen",
    "transmission": "utn",
    "bridge_design": "ubdn",
    "bridge_pattern": "ubpn"
}

function durationDecoder(value){
    if (!value) return value
    let newStr = value.slice(0, value.indexOf(' ')) + " дн."
    return newStr
}

export const machine_buttons = [
    {
        text: "Добавить ТО",
        link: "/add/service/", 
        role: 0
    },
    {
        text: "Добавить рекламацию",
        link: "/add/complaint/",
        role: 1
    },
]


const business_info_mapper = [
    {
        field: "supply_contract",
        text: "	Договор поставки №, дата"
    },
    {
        field: "ship_date",
        text: "Дата отгрузки с завода",
        decoder: dateDecoder
    },
    {
        field: "equipment",
        text: "	Комплектация (доп. опции)"
    },
    {
        field: "adress",
        text: "Адрес поставки (эксплуатации)"
    },
    {
        field: "consignee",
        text: "	Грузополучатель (конечный потребитель)"
    },
]

let service_mapper = [
    {
        field: "date",
        text: "Дата поломки",
        decoder: dateDecoder
    },
    {
        field: "operating_time",
        text: "Наработка, м/час"
    },
    {
        field: "organization",
        text: "Организация, проводившая ТО"
    },
    {
        field: "order_date",
        text: "Дата заказ-наряда",
        decoder: dateDecoder
    },
    {
        field: "order_number",
        text: "№ заказ-наряда"
    },
]

let complaint_mapper = [
    {
        field: "disorder_date",
        text: "Дата отказа",
        decoder: dateDecoder
    },
    {
        field: "repair_date",
        text: "Дата восстановления",
        decoder: dateDecoder
    },
    {
        field: "wasted_time",
        text: "Время простоя",
        decoder: durationDecoder
    },
    {
        field: "description",
        text: "Описание"
    },
    {
        field: "operating_time",
        text: "Наработка, м/час"
    },
    {
        field: "spare_parts",
        text: "	Используемые запасные части"
    },
]


export const params_to_mapper = {
    'machine': business_info_mapper,
    'service': service_mapper,
    "complaint": complaint_mapper
}



export function infoParser(data){
    let infobooks = []
    let users = []
    let key = 0
    for(let item in data){
        if (typeof data[item] == "object" && data[item] && Object.keys(data?.[item]).length == 4){
            if(data[item].hasOwnProperty('type')) infobooks.push(<InfoBookParser key={key} data={data?.[item]} un={data?.[unique_number_adder[data?.[item]?.['type']]]}/>)
            else{
                users.push(<UserParser key={key} data={data?.[item]}/>)
            } 
        }
        key ++
    }
    return [infobooks, users]
}


export function infoMapper(mapper, data){
    let business_info = mapper.map((item, index) => {
        return (
            <div className="business_info_segment" key={index}>
                <h2>{item.text}</h2>
                <p>{item?.decoder? item.decoder(data[item.field]) : data[item.field]}</p>
            </div>
        )
    })
    return business_info
}