import React from 'react'
import { Formik, Form, Field, } from 'formik'
import { Container, Row, Col, Button, ButtonGroup, } from 'react-bootstrap'
import classNames from 'classnames'
import * as Yup from 'yup'
import { Input, UsernameInput, } from '@Components/Form'
import { AuthLogo, } from '@Components'
import { Api } from '@/Middleware'

const initialData = {
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    passwordConfirmation: '',
}

function checkUsernameIsAvailable (username) {
    return fetch(route('register.check_username'), {
        method: 'POST',
        headers: {
            'X-CSRF-Token': document.head.querySelector("[name~=csrf-token][content]").content,
        },
        body: JSON.stringify({
            username,
        })
    })
    .then(async (res) => {
        const { is_available } = await res.json();
        return is_available;
    })
}

const Schema = Yup.object().shape({
    firstName: Yup.string().min(3, 'Too Short').max(50, 'Too long!').required('First Name is required'),
    lastName: Yup.string().min(3, 'Too Short').max(50, 'Too long!').required('Last Name is required'),
    email: Yup.string().email('A valid Email Address is required').required('Email Address is required'),
    username: Yup.string().min(5, 'Too Short').max(50, 'Too long!').required('Username is required').test('checkDuplicateUsername', 'This username already exists.', (username) => {
        if (username) {
            if (username.length < 5) {
                return false;
            } else {
                return fetch(route('register.check_username'), {
                    method: 'POST',
                    headers: {
                        'X-CSRF-Token': document.head.querySelector("[name~=csrf-token][content]").content,
                    },
                    body: JSON.stringify({
                        username,
                    })
                })
                .then(async (res) => {
                    const { is_available } = await res.json();
                    return true;
                    // return is_available; // true, if the provided username is available for use
                })
                .catch((err) => {
                    console.error(err);
                    return false;
                })
            }
        }
    }),
    password: Yup.string().min(8, 'Too short, minimum 8 characters').required('Password is required'),
    passwordConfirmation: Yup.string().required('Confirm Password is required').oneOf([Yup.ref('password'), null], 'Passwords must match'),
})

function RegisterForm({ appTitle, data = initialData, submit, cancel, ...props }) {

    return (
        <Formik
            initialValues={data}
            onSubmit={submit}
            validationSchema={Schema}
        >
            {({ errors, values, touched, isValidating, dirty, isValid, ...formikProps }) => {

                let isDisabled = (!dirty || (dirty && !isValid));

                return (<Form>
                    <AuthLogo height={100} light inline logoText={appTitle} />
                    <h4>Create an account</h4>
                    <Row>
                        <Col md={6}>
                            <Field
                                name='firstName'
                                component={Input}
                                placeholder='First Name'
                                label='First Name'
                            />
                        </Col>
                        <Col md={6}>
                            <Field
                                name='lastName'
                                component={Input}
                                placeholder='Last Name'
                                label='Last Name'
                            />
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Field
                                name='username'
                                component={Input}
                                placeholder='Username'
                                label='Username'
                            />
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Field
                                name='email'
                                component={Input}
                                placeholder='Email Address'
                                label='Email Address'
                            />
                        </Col>
                    </Row>

                    <Row>
                        <Col md={6}>
                            <Field
                                name='password'
                                component={Input}
                                placeholder='Password'
                                label='Password'
                                type='password'
                            />
                        </Col>
                        <Col md={6}>
                            <Field
                                name='passwordConfirmation'
                                component={Input}
                                placeholder='Confirm Password'
                                label='Confirm Password'
                                type='password'
                            />
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <hr />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <ButtonGroup>
                                <Button
                                    type='submit'
                                    variant={(dirty && isValid) ? 'success' : 'outline-primary'}
                                    disabled={isDisabled}
                                >
                                    Create Account
                                </Button>
                                <a className='btn btn-secondary' href={route('login')} variant='secondary'>Cancel</a>
                            </ButtonGroup>
                        </Col>
                    </Row>
                </Form>)
            }}
        </Formik>
    )
}

export default RegisterForm
