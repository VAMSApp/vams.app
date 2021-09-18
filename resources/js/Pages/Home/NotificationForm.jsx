import React, { useState, useEffect, } from 'react'
import { Formik, Form, Field, } from 'formik'
import { Inertia } from '@inertiajs/inertia'
import { Container, Row, Col, Button, ButtonGroup, Modal, } from 'react-bootstrap'
import classNames from 'classnames'
import * as Yup from 'yup'
import { Input, UsernameInput, SwitchInput, SelectInput, TextArea, } from '@Components/Form'
import { Api } from '@/Middleware'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

const initialValues = {
    name: '',
    email: '',
    sim_type: '',
    fleet_mgmt: '',
    jobs: '',
    flight_tracking: '',
    sync_onair_company: '',
    sync_onair_fleet: '',
    sync_onair_employees: '',
    sync_onair_fbos: '',
    sync_onair_cashflow: '',
    neofly_import_aircraft: '',
    neofly_import_career: '',
    neofly_import_navdata: '',
    comments: '',
};

const Schema = Yup.object().shape({
    name: Yup.string().min(1, 'Too Short').max(100, 'Too long!').required('Your Name is required'),
    email: Yup.string().email('A valid Email Address is required').required('Email Address is required'),
});

export default function NotificationForm({ simTypes, toggleModal, isVisible, }) {
    const submit = (values, actions) => {
        console.log('submitting', values);

        Inertia.post(route('enroll.notification'), values)

        actions.resetForm();
        actions.setSubmitting(false);
        setFormFilled(true);
        toggleModal();

    }

    const [onAirSync, toggleOnAirSync] = useState(false);
    const [neoFlyImport, toggleNeoFlyImport] = useState(false);

    const _formFilled = localStorage.getItem('formFilled');
    const [formFilled, setFormFilled] = useState(_formFilled || false)

    useEffect(() => {
        localStorage.setItem('formFilled', formFilled)
    }, [formFilled]);

    return (<Modal show={isVisible} onHide={toggleModal} centered size='lg'>
        <Modal.Header closeButton>
            <Modal.Title>Get notified when registrations open!</Modal.Title>
        </Modal.Header>
        <Formik
            initialValues={initialValues}
            onSubmit={submit}
            validationSchema={Schema}
        >
            {({ errors, values, touched, isValidating, isSubmitting, dirty, isValid, ...formikProps }) => {

                let isDisabled = (!dirty || (dirty && !isValid));

                return (
                    <Form>
                        <Modal.Body>
                            <Row>
                                <Col>
                                    <Field
                                        name='name'
                                        component={Input}
                                        placeholder='Your Name'
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col md={12}>
                                    <Field
                                        name='email'
                                        component={Input}
                                        placeholder='Email Address'
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
                                    <Field
                                        name='sim_type'
                                        component={SelectInput}
                                        options={simTypes}
                                        multiple
                                        label='I primarily use the following simulators'
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <p>The following features that I'm most interested in a virtual airline management system are:</p>

                                    <Field
                                        name='fleet_mgmt'
                                        component={SwitchInput}
                                        label='Fleet/Aircraft Management'
                                    />
                                    <Field
                                        name='jobs'
                                        component={SwitchInput}
                                        label='Cargo, and Passenger Job Generation'
                                    />
                                    <Field
                                        name='flight_tracking'
                                        component={SwitchInput}
                                        label='Flight Tracking'
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <p>I'd also be interested in the following Third Party VA functionalities:</p>
                                    <Button size='sm' variant={(onAirSync) ? 'outline-info' : 'outline-dark'} onClick={() => toggleOnAirSync(!onAirSync)}>OnAir Synchronization</Button>
                                    <Button size='sm' variant={(neoFlyImport) ? 'outline-info' : 'outline-dark'} onClick={() => toggleNeoFlyImport(!neoFlyImport)}>NeoFly Import</Button>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm={6}>
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
                                </Col>
                                <Col sm={6}>
                                    {neoFlyImport && <>
                                    <Row>
                                        <Col>
                                            <Field
                                                name='neofly_import_aircraft'
                                                component={SwitchInput}
                                                label='Neo Fly Import Aircraft'
                                            />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Field
                                                name='neofly_import_career'
                                                component={SwitchInput}
                                                label='Neo Fly Import Career'
                                            />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Field
                                                name='neofly_import_navdata'
                                                component={SwitchInput}
                                                label='Neo Fly Import Navdata'
                                            />
                                        </Col>
                                    </Row>
                                    </>}
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Field
                                        name='comments'
                                        component={TextArea}
                                        textarea
                                        rows={6}
                                        label='Comments, feedback, suggestions'
                                    />
                                </Col>
                            </Row>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button type='submit' block variant={(!isDisabled) ? 'primary' : 'secondary' } disabled={isDisabled}>
                                {(isSubmitting)
                                    ? (<FontAwesomeIcon icon={faSpinner} spin />)
                                    : (isDisabled) ? 'Fill the form out, first then click me' : 'Notify me!'
                                }
                            </Button>
                        </Modal.Footer>
                    </Form>
                )
            }}
        </Formik>
    </Modal>)
}
