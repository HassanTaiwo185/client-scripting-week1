import { useState } from "react";


export default function useFormValidation({initial, validators, products, editId}) {
    const [values, setValues]   = useState({ name:"", price:"", stock:"", category:"", description:"", ...initial })
    const [errors, setErrors]   = useState({})
    const [touched, setTouched] = useState({})


    function validateFields(field, value){
        const rule = validators[field]
        const msg = rule ? rule(value, products, editId) : null
        setErrors(prev => ({ ...prev, [field]: msg }))
        return msg
    }

    function handleChange(field, value){
        setValues(prev => ({ ...prev, [field]: value }))
        validateFields(field, value)
    }

    function handleBlur(field){
        setTouched(prev => ({ ...prev, [field]: true }))
        validateFields(field, values[field])
    }

    function validateAll(){
        const errs = {}
        for(const field of Object.keys(validators)){
            errs[field] = validateFields(field, values[field])
        }
        setErrors(errs)
        setTouched(Object.fromEntries(Object.keys(validators).map(field => [field, true])))
        return errs
    }

    return {
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        validateAll
    }

}