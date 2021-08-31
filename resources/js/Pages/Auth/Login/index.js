import React, { useEffect } from 'react'
import { InertiaLink } from '@inertiajs/inertia-react'
import { useForm } from '@inertiajs/inertia-react'
import { Container, Row, Col, Button, Alert, Form, ButtonGroup, } from 'react-bootstrap'
import { AuthLogo } from '@Components'
import { Input, Checkbox, ValidationErrors, } from '@Components/Form'
import Layouts from '@Layouts'
import './styles.scss'

export default function Login({ status, canResetPassword }) {

    const { data, setData, post, isDirty, hasErrors, processing, errors, reset, ...formProps } = useForm({
        email: '',
        password: '',
        remember: '',
    })

    console.log('formProps', formProps)
    useEffect(() => {
        return () => {
            reset('password')
        }
    }, [])

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value)
    }

    const submit = (e) => {
        e.preventDefault()

        post(route('login'))
    }

    return (<Layouts.Authenticating>
        <Container>
            {status && <Alert variant='danger'>{status}</Alert>}

            <Form className='form-login' onSubmit={submit}>
                <ValidationErrors errors={errors} />
                <AuthLogo height={50} light logoText='NDBB Airlines' />
                <Form.Group>
                    <Form.Control
                       type="email"
                       name="email"
                       value={data.email}
                       autoComplete="email"
                       placeholder="Email Address"
                       onChange={onHandleChange}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Control
                        type="password"
                        name="password"
                        value={data.password}
                        placeholder="Password"
                        autoComplete="current-password"
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
                        <Button size='md' variant='secondary' href={route('register')}>Register</Button>
                        <Button type='submit' variant='primary' size='md' disabled={(processing || (isDirty && hasErrors))}>Sign In</Button>
                    </ButtonGroup>
                </div>
                <div className="d-grid gap-2">
                    <Button size="md" variant="info" href={route('password.request')}>
                        Forgot Password?
                    </Button>
                </div>
            </Form>
        </Container>
    </Layouts.Authenticating>);
}
