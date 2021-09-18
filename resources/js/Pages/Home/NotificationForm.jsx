import React, { useState, } from 'react'
import { Formik, Form, Field, } from 'formik'
import { Inertia } from '@inertiajs/inertia'
import { Container, Row, Col, Button, ButtonGroup, } from 'react-bootstrap'
import classNames from 'classnames'
import * as Yup from 'yup'
import { Input, UsernameInput, SwitchInput, SelectInput, } from '@Components/Form'
import { Api } from '@/Middleware'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

const initialValues = {
    first_name: '',
    last_name: '',
    email: '',
    sync_onair_company: '',
    sync_onair_fleet: '',
    sync_onair_employees: '',
    sync_onair_fbos: '',
    sync_onair_cashflow: '',
    sim_type: '',
    comments: '',
};

const Schema = Yup.object().shape({
    first_name: Yup.string().min(1, 'Too Short').max(100, 'Too long!').required('First Name is required'),
    last_name: Yup.string().min(1, 'Too Short').max(100, 'Too long!').required('Last Name is required'),
    email: Yup.string().email('A valid Email Address is required').required('Email Address is required'),
});

export default function NotificationForm({ simTypes, }) {
    const submit = (values, actions) => {
        console.log(actions);

        Inertia.post(route('enroll.notification'), values)

        actions.resetForm();
        actions.setSubmitting(false);

    }

    const [onAirSync, toggleOnAirSync] = useState(false);

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={submit}
            validationSchema={Schema}
        >
            {({ errors, values, touched, isValidating, isSubmitting, dirty, isValid, ...formikProps }) => {

                let isDisabled = (!dirty || (dirty && !isValid));

                return (<Form>
                    <Row>
                        <Col md={6}>
                            <Field
                                name='first_name'
                                component={Input}
                                placeholder='First Name'
                                label='First Name'
                            />
                        </Col>
                        <Col md={6}>
                            <Field
                                name='last_name'
                                component={Input}
                                placeholder='Last Name'
                                label='Last Name'
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <Field
                                name='email'
                                component={Input}
                                placeholder='Email Address'
                                label='Email Address'
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
                            I'm interested in <Button size='sm' variant={(onAirSync) ? 'outline-info' : 'outline-dark'} onClick={() => toggleOnAirSync(!onAirSync)}>OnAir Synchronization</Button>
                        </Col>
                    </Row>
                    {onAirSync && <>
                    <Row>
                        <Col>
                            <Field
                                name='sync_onair_company'
                                component={SwitchInput}
                                label='Sync OnAir company'
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Field
                                name='sync_onair_fleet'
                                component={SwitchInput}
                                label='Sync OnAir fleet'
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Field
                                name='sync_onair_employees'
                                component={SwitchInput}
                                label='Sync OnAir employees'
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Field
                                name='sync_onair_fbos'
                                component={SwitchInput}
                                label='Sync OnAir fbos'
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Field
                                className='fs-6'
                                name='sync_onair_cashflow'
                                component={SwitchInput}
                                label='Sync OnAir cashflow'
                            />
                        </Col>
                    </Row>
                    </> }
                    <Row>
                        <Col>
                            <p>I primarily use the following sim</p>
                            <Field
                                name='sim_type'
                                component={SelectInput}
                                options={simTypes}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Field
                                name='comments'
                                component={Input}
                                as='textarea'
                                rows={6}
                                label='Comments, feedback, suggestions'
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
                            <Button type='submit' block variant={(!isDisabled) ? 'primary' : 'secondary' } disabled={isDisabled}>
                                {(isSubmitting)
                                    ? (<FontAwesomeIcon icon={faSpinner} spin />)
                                    : 'Yes, Notify me!'
                                }
                            </Button>
                        </Col>
                    </Row>
                </Form>)
            }}
        </Formik>
    )
}
