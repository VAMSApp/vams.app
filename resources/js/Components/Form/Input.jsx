import React, { useEffect, useRef } from 'react';
import { Form } from 'react-bootstrap';

export default function Input({
    type = 'text',
    name,
    value,
    className,
    autoComplete,
    required,
    isFocused,
    handleChange,
    label,
    labelProps,
    helpText,
}) {
    const input = useRef();

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    return (
        <div>
            {label &&
                <Form.Label {...labelProps}>{label}</Form.Label>
            }
            <Form.Control
                type={type}
                name={name}
                value={value}
                className={className}
                ref={input}
                autoComplete={autoComplete}
                required={required}
                onChange={(e) => handleChange(e)}
            />
            {helpText &&
                <Form.Text>{helpText}</Form.Text>
            }
        </div>
    );
}
