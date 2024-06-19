export const types = {
    CHARFIELD: "CHARFIELD",
    DATEFIELD: "DATEFIELD",
    TEXTFIELD: "TEXTFIELD",
    CHOOSELINE: "CHOOSELINE",
    DROPDOWN: "DROPDOWN",
    USERINPUT: "USERINPUT"
}


export const input_actions = {
    SET_DATA: "SET_DATA",
    VALIDATE: "VALIDATE",
    DISPLAYDROPDOWN: "DISPLAYDROPDOWN",
    CLEAR_STATE: "CLEAR_STATE",
    FETCH_ERROR: "FETCH_ERROR"
}


export const validators = {
    NOT_NULL: "NOT_NULL",
    FIELD_COMPARISON: "FIELD_COMPARISON",
    IS_INTEGER: "IS_INTEGER",
    MAX_LENGTH: "MAX_LENGTH",
    AVOID_CHARACTER: "AVOID_CHARACTER"
}


export const comparison_values = {
    EQUAL: "EQUAL",
    DATEGREATER: "DATEGREATER",
    DATELOWER: "DATELOWER"
}


export function formRequest(state)
{
    let formData = new FormData()
    for (let field in state){
        formData.append(field, state[field].value)
    }
    return formData
}

export function validateState(state, content_length)
{
    let counter = 0
    for (let field in state){
        if(state[field].hasOwnProperty('value')){
            counter += 1
        }
        for (let key in state[field]){
            if (['errors'].includes(key) && state[field][key][0]){
                return true
            }
        }
    }

    if(counter <= content_length - 1){
        return true
    }
    return false
}

function generateReshafle(field, inputList, state, foreignErrors)
{   
    let value = state?.[field]?.value
    if(!value) return false
    if(foreignErrors) return false

    let validators = inputList.find(element => element.id == field).validators
    let errors = validateErrors({value : value, data_validators: validators, state: state})
    let returned_obj = {
        [field]: {
            ...state[field],
            errors: errors
        }
    }
    return returned_obj
}


function validateErrors({value, data_validators, state=null})
{
    for (let validator of data_validators){
        if (validator == validators.NOT_NULL && value.length == 0){
            return [true, "Поле не должно оставаться пустым"]
        }
        if(validator == validators.IS_INTEGER){
            if (isNaN(Number(value))){
                return [true, 'Поле должно быть числовым']
            }
        }
        if (typeof validator == "object"){
            switch (validator.type)
            {
                case validators.AVOID_CHARACTER:
                    if(validator.regexp.test(value)) return [true, validator.msg]
                case validators.FIELD_COMPARISON:
                    if(!state?.[validator.toField]?.value) break;
                    switch(validator.mustBe)
                    {
                        case comparison_values.EQUAL:
                            if(state[validator.toField].value != value) return [true, validator.msg]
                        case comparison_values.DATEGREATER:
                            if(new Date(value).getTime() < new Date(state[validator.toField].value).getTime()) return [true, validator.msg]
                            break;
                        case comparison_values.DATELOWER:
                            if(new Date(value).getTime() > new Date(state[validator.toField].value).getTime()) return [true, validator.msg]   
                            break;
                    }
                case validators.MAX_LENGTH:
                    if(value?.length > validator.lowerThan) return [true, `Максимальная длина: ${validator.lowerThan} симв.`]
                default:
                    break;
            }
        }
    }
    return [false,]
}


export function inputsDispatcher(state, action){
    switch(action.type){
        case input_actions.SET_DATA:
            return {
                ...state,
                [action.id]: {
                    ...((action.value && !action.nullifyValue) && {value: action.value}),
                    errors: [false, ],
                    ...(action.manual && {manualInput: action.manual}),
                    ...(typeof action.noDisplay !== "undefined" && {display: !action.noDisplay})
                },
                msg: {
                    errors: false,
                    msg: null
                }
            }

        case input_actions.VALIDATE:
            let errors = validateErrors({value : action.value, data_validators: action.validators, state: state})
            let triggerReshufle = action.reshufle? generateReshafle(action.reshufle, action.inputList, state, errors[0]) : false
            return {
                ...state,
                [action.id] : {
                    ...state[action.id],
                    errors: errors
                },
                ...(triggerReshufle && triggerReshufle)
            } 

        case input_actions.DISPLAYDROPDOWN:
            return {
                ...state,
                [action.id] : {
                    ...state[action.id],
                    display: state[action.id]?.display? !state[action.id]?.display : true
                }
            }

        case input_actions.CLEAR_STATE:
            return {
                ...(action?.msg && {
                        msg: {
                            errors: false, 
                            msg: action.msg,
                            ...(action?.details && {details: action.details})
                        }
                    }
                )
            }
        
        case input_actions.FETCH_ERROR:
            return {
                ...state,
                msg: {
                    errors: true,
                    msg: action.msg,
                    ...(action?.details && {details: action.details})
                }
            }

        default:
            return state
    }
}


