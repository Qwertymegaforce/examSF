import { validators, types } from "../masterinput/master_utils"
import { CREATE } from "../../utils/paths"
import { comparison_values } from "../masterinput/master_utils"


export const service_inputs = [
    {
        placeholder: "Вид ТО",
        id: "type",
        type: types.DROPDOWN,
        validators: [validators.NOT_NULL],
        filterBy: "technical_inspection"
    },
    {
        placeholder: "Дата заказ-наряда",
        id: "order_date",
        type: types.DATEFIELD,
        validators: [validators.NOT_NULL, {type: validators.FIELD_COMPARISON, toField: "date", mustBe: comparison_values.DATELOWER, msg: "Дата заказ-наряда не может быть позже даты фактического ТО"}],
        reshufle: "date"
    },
    {
        placeholder: "Дата проведения ТО",
        id: "date",
        type: types.DATEFIELD,
        validators: [validators.NOT_NULL, {type: validators.FIELD_COMPARISON, toField: "order_date", mustBe: comparison_values.DATEGREATER, msg: "Дата фактического ТО не может быть раньше даты заказ-наряда"}],
        reshufle: "order_date"
    },
    {
        placeholder: "Наработка, м/час",
        id: "operating_time",
        type: types.CHARFIELD,
        validators: [validators.NOT_NULL, validators.IS_INTEGER]
    },
    {
        placeholder: "№ заказ-наряда",
        id: "order_number",
        type: types.CHARFIELD,
        validators: [validators.NOT_NULL]
    },
    {
        placeholder: "Организация, проводившая ТО",
        id: "organization",
        type: types.TEXTFIELD,
        validators: [validators.NOT_NULL]
    },
]


export const complaint_inputs = [
    {
        placeholder: "Дата отказа",
        id: "disorder_date",
        type: types.DATEFIELD,
        validators: [validators.NOT_NULL, {type: validators.FIELD_COMPARISON, toField: "repair_date", mustBe: comparison_values.DATELOWER, msg: "Дата отказа не может быть позже даты починки"}],
        reshufle: "repair_date"
    },
    {
        placeholder: "Дата восстановления",
        id: "repair_date",
        type: types.DATEFIELD,
        validators: [validators.NOT_NULL, {type: validators.FIELD_COMPARISON, toField: "disorder_date", mustBe: comparison_values.DATEGREATER, msg: "Дата починки не может быть раньше даты отказа"}],
        reshufle: "disorder_date"
    },
    {
        placeholder: "Наработка, м/час",
        id: "operating_time",
        type: types.CHARFIELD,
        validators: [validators.NOT_NULL, validators.IS_INTEGER]
    },
    {
        placeholder: "Узел отказа",
        id: "node",
        type: types.DROPDOWN,
        validators: [validators.NOT_NULL],
        filterBy: "node"
    },
    {
        placeholder: "Описание отказа",
        id: "description",
        type: types.TEXTFIELD,
        validators: [validators.NOT_NULL]
    },
    {
        placeholder: "Способ восстановления",
        id: "method",
        type: types.DROPDOWN,
        validators: [validators.NOT_NULL],
        filterBy: "repair_method"
    },
    {
        placeholder: "Используемые запасные части",
        id: "spare_parts",
        type: types.TEXTFIELD,
        validators: [validators.NOT_NULL]
    },
]



export const form_input_field = {
    "complaint": complaint_inputs,
    "service" : service_inputs
}


export const details_to_fetch = {
    'service' : CREATE + "/service",
    "complaint" : CREATE + "/complaint"
}
