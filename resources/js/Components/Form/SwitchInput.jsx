import classNames from 'classnames';
import React, { useEffect, useRef } from 'react';
import { Form, FormControl } from 'react-bootstrap';
import BootstrapSwitchButton from 'bootstrap-switch-button-react'

export default function SwitchInput({
    field: { name, id, ...field },
    form: { errors, touched, ...form }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
    helpText,
    label,
    ...props
}) {

    return (
        <div>
            <Form.Check
                type='switch'
                label={label}
                name={name || id}
                id={id || name}
                {...field}
            />
            {(touched[field.name] && errors[field.name]) &&
                <FormControl.Feedback type='invalid'>{errors[field.name]}</FormControl.Feedback>
            }
            {(touched[field.name] && !errors[field.name]) &&
                <FormControl.Feedback type='valid'>Looks Good!</FormControl.Feedback>
            }
            {helpText &&
                <Form.Text>{helpText}</Form.Text>
            }
        </div>
    );
}
