import React, { useState, } from 'react'
import { Formik, Form, Field, } from 'formik'
import { Container, Row, Col, Button, ButtonGroup, Modal, } from 'react-bootstrap'
import classNames from 'classnames'

import * as Yup from 'yup'
import { Input, UsernameInput, SwitchInput, FormLabel, } from '@Components/Form'

const initialData = {
    label: '',
    route_name: '',
    permission_name: '',
    is_active: false,
}

const Schema = Yup.object().shape({
    label: Yup.string().min(3, 'Too Short').max(50, 'Too long!').required('Label is required'),
    route_name: Yup.string().min(3, 'Too Short').max(50, 'Too long!').required('Route name is required'),
    permission_name: Yup.string().min(3, 'Too Short').max(50, 'Too long!').required('Route name is required'),
    is_active: Yup.boolean(),
})


function AddMenuItemForm({ data, submit, cancel, children, modal, ...props }) {
    const [is_active, setIsActive] = useState(false)

    const toggleIsActive = () => {
        setIsActive(!is_active)
    }

    const handleSubmit = (values) => {
        submit({
            ...values,
            is_active,
        })
    }

    return (modal)
        ? (<>
            <Formik
                initialValues={data || initialData}
                onSubmit={handleSubmit}
                validationSchema={Schema}
            >
                {({ errors, values, touched, isValidating, dirty, isValid, ...formikProps }) => {

                    let isDisabled = (!dirty || (dirty && !isValid));

                    return (<Form>
                                <Modal.Body>
                                    <Row>
                                        <Col>
                                            <Field
                                                name='label'
                                                id='label'
                                                component={Input}
                                                placeholder='Menu Item Label'
                                                label='Label'
                                            />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Field
                                                name='route_name'
                                                id='route_name'
                                                component={Input}
                                                placeholder='route.name'
                                                label='Route Name'
                                            />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Field
                                                name='permission_name'
                                                id='permission_name'
                                                component={Input}
                                                placeholder='permission.name'
                                                label='Permission Name'
                                            />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <FormLabel>Is Active?</FormLabel>
                                            <SwitchInput
                                                name='is_active'
                                                id='is_active'
                                                label={(is_active) ? 'Yes' : 'No'}
                                                type='switch'
                                                value={is_active}
                                                onChange={toggleIsActive}
                                            />
                                        </Col>
                                    </Row>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant='primary' type='submit' disabled={isDisabled}>Save</Button>
                                    <Button variant='secondary' onClick={cancel}>Cancel</Button>
                                </Modal.Footer>
                            </Form>)
                        }}
                </Formik>
          </>)
        : (<>
            <Formik
                initialValues={data || initialData}
                onSubmit={submit}
                validationSchema={Schema}
            >
                {({ errors, values, touched, isValidating, dirty, isValid, ...formikProps }) => {

                    let isDisabled = (!dirty || (dirty && !isValid));

                    return (
                        <Form>
                            <Row>
                                <Col>
                                    <h4>Add Menu Item</h4>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Field
                                        name='label'
                                        component={Input}
                                        placeholder='Menu Item Label'
                                        label='Label'
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Field
                                        name='route_name'
                                        component={Input}
                                        placeholder='route.name'
                                        label='Route Name'
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Field
                                        name='permission_name'
                                        component={Input}
                                        placeholder='permission.name'
                                        label='Permission Name'
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
                                            Add Menu Item
                                        </Button>
                                        <a className='btn btn-secondary' onClick={cancel} variant='secondary'>Cancel</a>
                                    </ButtonGroup>
                                </Col>
                            </Row>
                        </Form>
                    )
                }}
                </Formik>
          </>)
}

export default AddMenuItemForm
