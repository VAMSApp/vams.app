import React, { useEffect, useState } from 'react';
import { InertiaLink } from '@inertiajs/inertia-react';
import { useForm } from '@inertiajs/inertia-react';
import { Container, Row, Col, Button, Alert, Form, ButtonGroup, } from 'react-bootstrap'
import { AuthLogo, AuthHeading, } from '@Components'
import { Input, Checkbox, ValidationErrors, } from '@Components/Form'
import Layouts from '@Layouts'
import './styles.scss'

import './styles.scss';

export default function Register({ appTitle, }) {
    const { data, setData, isDirty, hasErrors, post, processing, errors, reset, ...rest } = useForm({
        name: '',
        username: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    console.log(rest);

    const initialState = {
        isCheckingUsername: false,
        isValid: false,
        usernameValue: '',
    };

    const { state, setState } = useState('');

    console.log(state);

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const onHandleChange = (event) => {
        const {
            name,
            type,
            checked,
            value,
        } = event.target;

        setData(name, (type === 'checkbox') ? checked : value);
    };

    const submit = (e) => {
        e.preventDefault();

        post(route('register'));
    };

    console.log(state);
    return (
        <Layouts.Authenticating>
            <ValidationErrors errors={errors} />

            <Form className='form-register' onSubmit={submit}>
                <ValidationErrors errors={errors} />
                <AuthLogo height={100} light logoText={appTitle} />
                <h4>Create an account</h4>
                <Form.Group>
                    <Form.Label htmlFor="name">Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="name"
                        value={data.name}
                        autoComplete="name"
                        placeholder="Tell us your Name"
                        required
                        onChange={onHandleChange}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label htmlFor="email">Email Address</Form.Label>
                    <Form.Control
                        type="email"
                        name="email"
                        value={data.email}
                        autoComplete="email"
                        placeholder="Tell us your email Address"
                        required
                        onChange={onHandleChange}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label htmlFor="password">Password</Form.Label>
                    <Form.Control
                        type="password"
                        name="password"
                        value={data.password}
                        autoComplete="new-password"
                        placeholder="Type a secure password"
                        required
                        onChange={onHandleChange}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label htmlFor="password_confirmation">Confirm Password</Form.Label>
                    <Form.Control
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        placeholder="Type the same password again"
                        required
                        onChange={onHandleChange}
                    />
                </Form.Group>

                <Row>
                    <Col>
                        <hr />
                    </Col>
                </Row>
                <div className="d-grid gap-2">
                    <ButtonGroup>
                        <Button size='md' variant='secondary' href={route('login')}>Cancel</Button>
                        <Button type='submit' variant='primary' size='md' disabled={(processing || (isDirty && hasErrors))}>Register</Button>
                    </ButtonGroup>
                </div>
            </Form>
        </Layouts.Authenticating>
    );
}
