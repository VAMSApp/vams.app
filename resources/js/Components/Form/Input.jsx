import classNames from 'classnames';
import React, { useEffect, useRef } from 'react';
import { Form, FormControl } from 'react-bootstrap';

export default function Input({
    field,
    form: { errors, touched, ...form }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
    label,
    helpText,
    ...props
}) {

    return (
        <div>
            {label &&
                <Form.Label>{label}</Form.Label>
            }
            <FormControl
                isValid={(touched[field.name] && !errors[field.name])}
                isInvalid={(touched[field.name] && errors[field.name])}
                {...field}
                {...props}
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
