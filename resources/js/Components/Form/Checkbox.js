import React from 'react';

export default function Checkbox({ name, value, handleChange, className, ...props }) {
    return (
        <input
            type="checkbox"
            name={name}
            value={value}
            className={className}
        />
    );
}
