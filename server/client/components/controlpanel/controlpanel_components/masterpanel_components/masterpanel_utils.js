import { types, validators } from "../../../masterinput/master_utils";
import { slidertabs_choices } from "../sidebar_tabs/slider_tabs";
import { HTTP, DOMAIN, API, VERSION, CREATE, LIST, DELETE, EDIT } from "../../../../utils/paths";
import { comparison_values } from "../../../masterinput/master_utils";


export const edit_del_tabs_values = {
    CREATE: "CREATE",
    EDIT: "EDIT"
}

export const edit_del_tabs = [
    {
        text: "Создать",
        tab: edit_del_tabs_values.CREATE
    },
    {
        text: "Изменить",
        tab: edit_del_tabs_values.EDIT
    }
]

export const user_inputs = [
    {
        placeholder: "Имя",
        id: "first_name",
        type: types.CHARFIELD,
        validators: [validators.NOT_NULL, {type: validators.MAX_LENGTH, lowerThan: 16}]
    },
    {
        placeholder: "Логин",
        id: "username",
        type: types.CHARFIELD,
        validators: [
            validators.NOT_NULL, 
            {type: validators.AVOID_CHARACTER, regexp: / /m, msg: "Запрещено использование пробелов"}
        ],
    },
    {
        lines: [
            {
                title: "Клиент",
                value: 1
            },
            {
                title: "Сервисная организация",
                value: 2
            },
            {
                title: "Менеджер",
                value: 3
            },
        ],
        id: "role",
        type: types.CHOOSELINE,
    },
    {
        placeholder: "Пароль",
        id: "password",
        type: types.CHARFIELD,
        validators: [
            validators.NOT_NULL, 
            {type: validators.FIELD_COMPARISON, toField: "confPassword", mustBe: comparison_values.EQUAL, msg: "Пароли не совпадают"}
        ],
        reshufle: "confPassword",
        ispassword: true
    },
    {
        placeholder: "Подвердите пароль",
        id: "confPassword",
        type: types.CHARFIELD,
        validators: [validators.NOT_NULL, 
            {type: validators.FIELD_COMPARISON, toField: "password", mustBe: comparison_values.EQUAL, msg: "Пароли не совпадают"}
        ],
        reshufle: "password",
        ispassword: true
    },
]


export const infobook_inputs = [
    {
        placeholder: "Название справочника",
        id: "title",
        type: types.CHARFIELD,
        validators: [
            validators.NOT_NULL, 
            {
                type: validators.MAX_LENGTH,
                lowerThan: 32
            }
        ]
    },
    {
        placeholder: "Вид справочника",
        id: "type",
        type: types.DROPDOWN,
        validators: [validators.NOT_NULL]
    },
    {
        placeholder: "Описание справочника",
        id: "text",
        type: types.TEXTFIELD,
        validators: [validators.NOT_NULL]
    },
]


export const truck_inputs = [
    {
        placeholder: "Зав. № машины",
        id: "umn",
        type: types.CHARFIELD,
        validators: [
            validators.NOT_NULL, 
            {type: validators.AVOID_CHARACTER, regexp: /(\/)|\s/m, msg: 'Запрещены пробелы и слеши'},
            {type: validators.MAX_LENGTH, lowerThan: 32}
        ],
    },
    {
        placeholder: "Модель техники",
        id: "model",
        type: types.DROPDOWN,
        filterBy: "model",
        validators: [validators.NOT_NULL]
    },
    {
        placeholder: "Модель двигателя",
        id: "engine",
        type: types.DROPDOWN,
        filterBy: "engine",
        validators: [validators.NOT_NULL]
    },
    {
        placeholder: "Зав. № двигателя",
        id: "uen",
        type: types.CHARFIELD,
        validators: [validators.NOT_NULL, {type: validators.MAX_LENGTH, lowerThan: 32}]
    },
    {
        placeholder: "Модель трансмиссии",
        id: "transmission",
        type: types.DROPDOWN,
        filterBy: "transmission",
        validators: [validators.NOT_NULL]
    },
    {
        placeholder: "Зав. № трансмиссии",
        id: "utn",
        type: types.CHARFIELD,
        validators: [validators.NOT_NULL, {type: validators.MAX_LENGTH, lowerThan: 32}]
    },
    {
        placeholder: "Модель ведущего моста",
        id: "bridge_design",
        type: types.DROPDOWN,
        filterBy: "bridge_design",
        validators: [validators.NOT_NULL]
    },
    {
        placeholder: "Зав. № ведущего моста",
        id: "ubdn",
        type: types.CHARFIELD,
        validators: [validators.NOT_NULL, {type: validators.MAX_LENGTH, lowerThan: 32}]
    },
    {
        placeholder: "Модель управляемого моста",
        id: "bridge_pattern",
        type: types.DROPDOWN,
        filterBy: "bridge_pattern",
        validators: [validators.NOT_NULL]
    },
    {
        placeholder: "Зав. № управляемого моста",
        id: "ubpn",
        type: types.CHARFIELD,
        validators: [validators.NOT_NULL, {type: validators.MAX_LENGTH, lowerThan: 32}]
    },
    {
        placeholder: "Договор поставки №, дата",
        id: "supply_contract",
        type: types.TEXTFIELD,
        validators: [validators.NOT_NULL]
    },
    {
        placeholder: "Дата отгрузки с завода",
        id: "ship_date",
        type: types.DATEFIELD,
        validators: [validators.NOT_NULL]
    },
    {
        placeholder: "Грузополучатель (конечный потребитель)",
        id: "consignee",
        type: types.TEXTFIELD,
        validators: [validators.NOT_NULL]
    },
    {
        placeholder: "Адрес поставки (эксплуатации)",
        id: "adress",
        type: types.TEXTFIELD,
        validators: [validators.NOT_NULL]
    },
    {
        placeholder: "Комплектация (доп. опции)",
        id: "equipment",
        type: types.TEXTFIELD,
        validators: [validators.NOT_NULL]
    },
    {
        placeholder: "Клиент",
        id: "client",
        type: types.USERINPUT,
        validators: [validators.NOT_NULL],
        role: 1
    },
    {
        placeholder: "Сервисная компания",
        id: "service",
        type: types.USERINPUT,
        validators: [validators.NOT_NULL],
        role: 2
    },
]


export const infobook_types = [
    {
        title: "Модель техники",
        value: "model"
    },
    {
        title: "Двигатель",
        value: "engine"
    },
    {
        title: "Трансмиссия",
        value: "transmission"
    },
    {
        title: "Ведущий мост",
        value: "bridge_design"
    },
    {
        title: "Управляемый мост",
        value: "bridge_pattern"
    },
    {
        title: "Вид ТО",
        value: "technical_inspection"
    },
    {
        title: "Узел отказа",
        value: "node"
    },
    {
        title: "Способ восстановления",
        value: "repair_method"
    },
]

export const inputs_to_render = {
    [slidertabs_choices.USERS]: user_inputs,
    [slidertabs_choices.INFOBOOKS]: infobook_inputs,
    [slidertabs_choices.TRUCKS]: truck_inputs
}



export function changeUserList(list){
    list = list.map((item) => {
        return {
            title: item.first_name,
            value: item.id
        }
    })
    return list
}



export const create_to_fetch = {
    [slidertabs_choices.USERS]: CREATE + "/user",
    [slidertabs_choices.INFOBOOKS]: CREATE + "/infobook",
    [slidertabs_choices.TRUCKS]: CREATE + "/machine"
}


export const table_headers = {
    [slidertabs_choices.USERS]: [
        {
            title: "Имя пользователя"
        },
        {
            title: "Роль"
        },
    ],
    [slidertabs_choices.INFOBOOKS]: [
        {
            title: "Название справочника"
        },
        {
            title: "Тип справочника"
        },

    ],
}


export const table_to_fetch = {
    [slidertabs_choices.USERS]: LIST + "/user",
    [slidertabs_choices.INFOBOOKS]: LIST + "/infobook",
}


export const formBy = {
    [slidertabs_choices.USERS]: ['first_name', "role"],
    [slidertabs_choices.INFOBOOKS]: ['title', "type"],
}


export const addButtons_values = {
    DELETE: "DELETE",
    EDIT: "EDIT"
}


export const addButtons = {
    [slidertabs_choices.USERS]: {
        type: addButtons_values.DELETE,
        text: "Удалить"
    },
    [slidertabs_choices.INFOBOOKS]: {
        type: addButtons_values.EDIT,
        text: "Изменить"
    },
}


export function getTableData(currentTab, token, setState){
    if ((currentTab !== slidertabs_choices.TRUCKS)){
        fetch(HTTP + DOMAIN + API + VERSION + table_to_fetch[currentTab], {
            headers: {
                "Token" : token
            }
        })
          .then(res => res.json())
          .then(data => setState(data))
    }
}

const role_decoder = {
    1: "Клиент",
    2: "Сервисная организация",
    3: "Менеджер"
}

export const type_decoder = {
    'model': "Модель",
    'engine': "Двигатель",
    'transmission': "Трансмиссия",
    'bridge_design': "Ведущий мост",
    'bridge_pattern': "Управляемый мост",
    'technical_inspection': "Вид ТО",
    'node': "Узел отказа", 
    'repair_method': "Способ восстановления",
}

function decodeRole(role){
    return role_decoder?.[role]
}


function decodeType(type){
    return type_decoder?.[type]
}



export const controlpanel_parsers = {
    [slidertabs_choices.USERS] : [
        {
            value: ['first_name']
        },
        {
            value: ['role'],
            decoder: decodeRole
        },
    ],
    [slidertabs_choices.INFOBOOKS]: [
        {
            value: ['title']
        },
        {
            value: ['type'],
            decoder: decodeType
        },
    ]
}


export const add_controlpanel_buttons = {
    [slidertabs_choices.USERS] : [
        {
            type: "delete",
            title: 'Удалить',
            link: DELETE + "/user",
            onFinish : getTableData
        }
    ],
    [slidertabs_choices.INFOBOOKS]: [
        {
            type: "redirect",
            title: 'Изменить',
            link: `/${EDIT}` + "/infobook",
        }
    ]

}


export const panel_workspace_classes = {
    [slidertabs_choices.USERS]: "workspace_users",
    [slidertabs_choices.INFOBOOKS]: "workspace_infobooks",
    [slidertabs_choices.TRUCKS]: "workspace_trucks"
}


export const panel_edit_classes = {
    [slidertabs_choices.USERS]: "users_table",
    [slidertabs_choices.INFOBOOKS]: "infobook_table",
}

