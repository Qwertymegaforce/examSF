import { HTTP, DOMAIN, API, VERSION, LIST, DBLIST } from "../../../utils/paths"


export const superusers = {
    3: "менеджер (расширенные права)",
    4: "администратор (расширенные права)"
}


export const machine_tabs_values = {
    BRIEF: "BRIEF",
    SERVICE: "SERVICE",
    COMPLAINT: "COMPLAINT"
}

let tabs_to_fetch = {
    [machine_tabs_values.BRIEF] : LIST + "/machine",
    [machine_tabs_values.SERVICE] : LIST + "/service",
    [machine_tabs_values.COMPLAINT] : LIST + "/complaint",
}

let umn_tabs_to_fetch = {
    [machine_tabs_values.BRIEF] : DBLIST + "/machine",
    [machine_tabs_values.SERVICE] : DBLIST + "/service",
    [machine_tabs_values.COMPLAINT] : DBLIST + "/complaint",
}





export const tds = {
    [machine_tabs_values.BRIEF] : [
        {
            title: "Уникальный номер техники"
        },
        {
            title: "Дата отгрузки с завода",
            sorting: true,
            sortingField: "ship_date"
        },
        {
            title: "Модель техники"
        },
        {
            title: 'Модель двигателя'
        },
        {
            title: "Модель трансмиссии"
        },
        {
            title: "Модель управляемого моста"
        },
        {
            title: "Модель ведущего моста"
        },
    ],
    [machine_tabs_values.SERVICE]: [
        {
            title: "Уникальный номер техники"
        }, 
        {
            title: "Вид ТО"
        }, 
        {
            title: "Дата проведения ТО",
            sorting: true,
            sortingField: "date"
        }, 
        {
            title: "Наработка м/час."
        }, 
        {
            title: "Сервисная компания"
        }, 
    ],
    [machine_tabs_values.COMPLAINT] : [
        {
            title: "Уникальный номер техники"
        }, 
        {
            title: "Дата отказа",
            sorting: true,
            sortingField: "disorder_date"
        },
        {
            title: "Наработка м/час."
        },
        {
            title: "Узел отказа"
        },
        {
            title: "Способ восстановления"
        },
        {
            title: "Сервисная компания"
        },
    ]
}


export const machine_tabs = [
    {
        text: "Общая информация",
        tab: machine_tabs_values.BRIEF
    },
    {
        text: "Тех. обслуживание",
        tab: machine_tabs_values.SERVICE
    },
    {
        text: "Рекламации",
        tab: machine_tabs_values.COMPLAINT
    },
]



export function determineAddHeaders(role, tab){
    if (tab == machine_tabs_values.BRIEF && role > 2){
        return [{title: "Редактировать"}]
    }
    if (tab == machine_tabs_values.COMPLAINT && role > 1){
        return [{title: "Редактировать"}]
    }
    if (tab == machine_tabs_values.SERVICE && role){
        return [{title: "Редактировать"}]
    }
    return []
}

const default_links = {
    [machine_tabs_values.BRIEF] : "/machine",
    [machine_tabs_values.SERVICE] : '/service',
    [machine_tabs_values.COMPLAINT] : '/complaint',
}

export const table_classes = {
    [machine_tabs_values.BRIEF] : "machine_table",
    [machine_tabs_values.SERVICE] : 'service_table',
    [machine_tabs_values.COMPLAINT] : 'complaint_table',
}


export function determineAddBodyButtons(role, tab){
    let buttonArr = [
        {
            type: "redirect",
            title: 'Подробнее',
            link: default_links[tab]
        }
    ]
    if (tab == machine_tabs_values.BRIEF && role > 2){
        buttonArr.push(
            {
                type: "redirect",
                title: "Редактировать",
                link: "/edit/machine"
            }
        )
    }
    if (tab == machine_tabs_values.COMPLAINT && role > 1){
        buttonArr.push(
            {
                type: "redirect",
                title: "Редактировать",
                link: "/edit/complaint"
            }
        )
    }
    if (tab == machine_tabs_values.SERVICE && role){
        buttonArr.push(
            {
                type: "redirect",
                title: "Редактировать",
                link: "/edit/service"
            }
        )
    }
    return buttonArr
}


export function getUserMainPageData({token, tab=machine_tabs_values.BRIEF, setState}){
    fetch(HTTP + DOMAIN + API + VERSION + tabs_to_fetch[tab], {
        headers : {
            ...(token && {"Token" : token})
        },
        method: "GET"
    }).then(res => res.json())
      .then(data=> {
        setState(prevState => {
            return {
                ...prevState,
                data: data,
                filters: [],
                sorting: null,
                applyFilters: false,
                applySorting: false
            }
        })
    })
}


export function searchDataByUmn({token, tab=machine_tabs_values.BRIEF, setState, umn}){
    fetch(HTTP + DOMAIN + API + VERSION + umn_tabs_to_fetch[tab] + `/${umn}/`, {
        headers : {
            ...(token && {"Token" : token})
        },
        method: "GET"
    }).then(res => res.json())
      .then(data=> {
        setState(prevState => {
            return {
                ...prevState,
                data: data,
                filters: [],
                sorting: null,
                applyFilters: false,
                applySorting: false
            }
        })
    })
}

const numbet_to_month = {
    0: "Января",
    1: "Февраля",
    2: "Марта",
    3: "Апреля",
    4: "Мая",
    5: "Июня",
    6: "Июля",
    7: "Августа",
    8: "Сентября",
    9: "Октября",
    10: "Ноября",
    11: "Декабря",
}


export function dateDecoder(date){
    let func_date = new Date(date)
    return `${func_date.getDate()} ${numbet_to_month[func_date.getMonth()]} ${func_date.getFullYear()}`
}


const main_parse_by_brief = [
    {
        value: ['umn',],
        fieldName: "Уникальный номер"
    },
    {
        value: ['ship_date', ],
        decoder: dateDecoder,
        fieldName: "Дата отгрузки"
    },
    {
        value: ['model', 'title'],
        fieldName: "Модель техники"

    },
    {
        value: ['engine', 'title'],
        fieldName: "Модель двигателя"
    },
    {
        value: ['transmission', 'title'],
        fieldName: "Модель трансмиссии"
    },
    {
        value: ['bridge_pattern', 'title'],
        fieldName: "Модель УМ"
    },
    {
        value: ['bridge_design', 'title'],
        fieldName: "Модель ВМ"
    },
]

const main_parse_by_service = [
    {
        value: ['machine', 'umn'],
        fieldName: "Уникальный номер"
    },
    {
        value: ['type', 'title'],
        fieldName: "Вид ТО"
    },
    {
        value: ['date',],
        decoder: dateDecoder,
        fieldName: "Дата проведения ТО"
    },
    {
        value: ['operating_time',],
        fieldName: "Наработка",
        postFix: "м/час"
    },
    {
        value: ['service_company', "first_name"],
        fieldName: "Сервисная компания"
    },
]

const main_parse_by_complaint = [
    {
        value: ['machine', 'umn'],
        fieldName: "Уникальный номер"
    },
    {
        value: ['disorder_date'],
        decoder: dateDecoder,
        fieldName: "Дата отказа"
    },
    {
        value: ['operating_time'],
        fieldName: "Наработка",
        postFix: "м/час"
    },
    {
        value: ['node', 'title'],
        fieldName: "Узел отказа",
    },
    {
        value: ['method', 'title'],
        fieldName: "Способ восстановления",
    },
    {
        value: ['service_company', 'first_name'],
        fieldName: "Сервисная компания"
    },

]


export const sorting_types = {
    ASCENDING: "ASCENDING",
    DESCENDING: "DESCENDING"
}

export const sort_type_decoder = {
    [sorting_types.ASCENDING] : "По возрастанию",
    [sorting_types.DESCENDING] : "По убыванию",
}


export const main_parse_by = {
    [machine_tabs_values.BRIEF] : main_parse_by_brief,
    [machine_tabs_values.SERVICE] : main_parse_by_service,
    [machine_tabs_values.COMPLAINT] : main_parse_by_complaint,
}