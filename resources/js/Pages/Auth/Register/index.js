import React from 'react';
import { Inertia } from '@inertiajs/inertia'
import Layouts from '@Layouts'
import './styles.scss'
import RegisterForm from './Form'

export default function Register({ appTitle, }) {

    const doSubmit = (values) => {
        Inertia.post(route('register'), {
            first_name: values.firstName,
            last_name: values.lastName,
            username: values.username,
            email: values.email,
            password: values.password,
            password_confirmation: values.passwordConfirmation,
        });
    };

    return (
        <Layouts.Authenticating>
            <RegisterForm
                appTitle={appTitle}
                submit={doSubmit}
            />
        </Layouts.Authenticating>
    );
}
