import { faOptinMonster } from '@fortawesome/free-brands-svg-icons';
import React from 'react'
import {
    Label,
    Input,
    FormText,
} from 'react-bootstrap';

export default function SelectComponent(props) {

    const {
        field, // { name, value, onChange, onBlur }
        form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
        label,
        id,
        name,
        type,
        options,
        validmsg,
        helptext,
        defaultselectmsg
    } = props;


    return (
        <div>
            {label &&
            <Label>{label}</Label>
            }
            <Input
                type='select'
                name={(field) ? field.name : name}
                id={(field) ? field.id : id}
                {...field}
                {...props}
            >
                <option>{defaultselectmsg || '-- SELECT --'}</option>
                {(options && options.length > 0) &&
                    options.map((o, k) => (<option key={k} value={o.slug}>{`${o.name}`}</option>))
                }
            </Input>
            {(touched[(field) ? field.name : name] && errors[(field) ? field.name : name]) && <FormText color='danger'>{errors[(field) ? field.name : name]}</FormText>}
            {(touched[(field) ? field.name : name] && !errors[(field) ? field.name : name]) && <FormText color='success'>{validmsg || 'Looks Good!'}</FormText>}
            {helptext && <FormText color='muted'>{helptext}</FormText>}
        </div>
    )
}
