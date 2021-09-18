import React, { useEffect } from 'react'
import { InertiaLink } from '@inertiajs/inertia-react'
import { useForm } from '@inertiajs/inertia-react'
import { Container, Row, Col, Button, Alert, Form, ButtonGroup, FormControl, } from 'react-bootstrap'
import { AuthLogo } from '@Components'
import { ValidationErrors, } from '@Components/Form'
import Layouts from '@Layouts'
import './styles.scss'

export default function Login({ status, appTitle, canResetPassword, canRegister }) {

    const { data, setData, post, isDirty, hasErrors, processing, errors, reset, ...formProps } = useForm({
        username: '',
        password: '',
        remember: '',
    })

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
                <AuthLogo height={80} light inline logoText={appTitle} />
                <h4>Sign In</h4>
                <ValidationErrors errors={errors} />
                <Form.Group>
                    <Form.Control
                       type="username"
                       name="username"
                       value={data.username}
                       autoComplete="username"
                       placeholder="Username"
                       onChange={onHandleChange}
                    />
                    {errors && errors.username &&
                        <FormControl.Feedback type='invalid'>{errors.username}</FormControl.Feedback>
                    }
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

                    {errors && errors.password &&
                    <FormControl.Feedback type='invalid'>{errors.password}</FormControl.Feedback>
                }
                </Form.Group>
                <Form.Group>
                    <Form.Switch
                        type="switch"
                        id="remember"
                        label="Remember Me"
                        onChange={onHandleChange}
                    />
                </Form.Group>
                <Row>
                    <Col>
                        <hr />
                    </Col>
                </Row>
                {(canRegister)
                ? (<Row>
                        <Col>
                            <ButtonGroup>
                                <Button type='submit' variant='primary' size='lg' disabled={(processing || (isDirty && hasErrors))}>Sign In</Button>
                                <Button size='lg' variant='secondary' href='/register'>Register</Button>
                            </ButtonGroup>
                        </Col>
                  </Row>)
                : (<Row>
                    <Col>
                        <Button block type='submit' variant='primary' size='lg' disabled={(processing || (isDirty && hasErrors))}>Sign In</Button>
                    </Col>
                  </Row>)
                }
                <div className="d-grid gap-2">
                    <Button size="lg" variant="info" href={route('password.request')}>
                        Forgot Password?
                    </Button>
                </div>
            </Form>
        </Container>
    </Layouts.Authenticating>);
}
