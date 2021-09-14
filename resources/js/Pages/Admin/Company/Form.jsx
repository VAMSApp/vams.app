import React, { useState, useEffect, } from 'react'
import { useForm } from "react-hook-form"
import { Modal, Badge, Row, Col, Form, FormControl, ButtonGroup, Button, InputGroup, } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faCheckSquare, faGlobeAmericas, faInfo, faInfoCircle, faPencilAlt, faPlane, faPlaneDeparture, faSpellCheck, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Table, } from '@Components'
import Layouts from '@Layouts'
import classNames from 'classnames';

const guidRegex = /^[{]?[0-9a-fA-F]{8}-([0-9a-fA-F]{4}-){3}[0-9a-fA-F]{12}[}]?$/i;

function CompanyForm({ data, worlds, doSubmit = null, doCancel, cancelHref, }) {
    const [state, setState] = useState({
        onAirName: false,
    })

    const {
        onAirName,
    } = state

    const toggleOnAirName = (e) => {
        e.preventDefault();

        setState({
            onAirName: !onAirName,
        })
    }

    const { register, handleSubmit, watch, formState: { dirtyFields, isDirty, isValid, isSubmitting, errors, ...formState }, ...formProps } = useForm({
        defaultValues: {
            uuid: (data) ? data.uuid : '',
            api_key: (data) ? data.api_key : '',
            worldId: (data) ? data.world_id : '',
        },
    })

    return (
        <Form onSubmit={handleSubmit(doSubmit)}>
            <Row>
                <Col md={2}>
                    <Form.Group>
                        <Form.Label>Company ICAO</Form.Label>
                        <Form.Control
                            value={data.airline}
                            plaintext={!doSubmit}
                            isInvalid={errors.airline}
                            isValid={(dirtyFields.airline && !errors.airline)}
                            disabled={!doSubmit}
                            {...register('airline', { required: true })}
                        />
                        {errors.airline &&
                            <FormControl.Feedback type='invalid'>
                                {(errors.airline.type === 'required') ? 'UUID Is Required' : errors.airline.message}
                            </FormControl.Feedback>
                        }
                    </Form.Group>
                </Col>
                <Col md={10}>
                    <Form.Group>
                        <Form.Label>OnAir Name</Form.Label>
                        {(name)
                            ?   (<InputGroup>
                                    <InputGroup.Prepend>
                                        <Button variant='outline-secondary' onClick={toggleOnAirName}>
                                            <FontAwesomeIcon icon={faGlobeAmericas} />
                                        </Button>
                                    </InputGroup.Prepend>
                                    {(name && !onAirName)
                                        ?   (<>
                                            <Form.Control
                                                value={data.name}
                                                plaintext={!doSubmit}
                                                isInvalid={errors.name}
                                                isValid={(dirtyFields.name && !errors.name)}
                                                disabled={!doSubmit}
                                                {...register('name', { required: true })}
                                            />
                                            {errors.name &&
                                                <FormControl.Feedback type='invalid'>
                                                    {(errors.name.type === 'required') ? 'UUID Is Required' : errors.name.message}
                                                </FormControl.Feedback>
                                            }
                                        </>)
                                        : (<>
                                            <Form.Control
                                                value={data.onair_name}
                                                plaintext={!doSubmit}
                                                isInvalid={errors.onair_name}
                                                isValid={(dirtyFields.onair_name && !errors.onair_name)}
                                                disabled={!doSubmit}
                                                {...register('onair_name', { required: true })}
                                            />
                                            {errors.onair_name &&
                                                <FormControl.Feedback type='invalid'>
                                                    {(errors.onair_name.type === 'required') ? 'UUID Is Required' : errors.onair_name.message}
                                                </FormControl.Feedback>
                                            }
                                        </>)
                                    }
                                </InputGroup>)
                                : (<>
                                    <Form.Control
                                        value={data.onair_name}
                                        plaintext={!doSubmit}
                                        isInvalid={errors.onair_name}
                                        isValid={(dirtyFields.onair_name && !errors.onair_name)}
                                        disabled={!doSubmit}
                                        {...register('onair_name', { required: true })}
                                    />
                                    {errors.onair_name &&
                                        <FormControl.Feedback type='invalid'>
                                            {(errors.onair_name.type === 'required') ? 'UUID Is Required' : errors.onair_name.message}
                                        </FormControl.Feedback>
                                    }
                                </>)
                        }

                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col md={6}>
                    <Form.Group>
                        <Form.Label>Company UUID</Form.Label>
                        <Form.Control
                            value={data.uuid}
                            plaintext={!doSubmit}
                            isInvalid={errors.uuid}
                            isValid={(dirtyFields.uuid && !errors.uuid)}
                            disabled={!doSubmit}
                            {...register('uuid', { required: true, pattern: guidRegex })}
                        />
                        {errors.uuid &&
                            <FormControl.Feedback type='invalid'>
                                {(errors.uuid.type === 'required') ? 'UUID Is Required' : errors.uuid.message}
                            </FormControl.Feedback>
                        }
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group>
                        <Form.Label>Company API Key</Form.Label>
                        <Form.Control
                            value={data.api_key}
                            plaintext={!doSubmit}
                            isInvalid={errors.api_key}
                            isValid={(dirtyFields.api_key && !errors.api_key)}
                            disabled={!doSubmit}
                            {...register('api_key', { required: true, pattern: guidRegex })}
                        />
                        {errors.api_key &&
                            <FormControl.Feedback type='invalid'>
                                {(errors.api_key.type === 'required') ? 'API Key Is Required' : errors.api_key.message}
                            </FormControl.Feedback>
                        }
                    </Form.Group>
                </Col>
            </Row>
            <Form.Group>
                <Form.Label>World</Form.Label>
                <Form.Control
                    as='select'
                    isInvalid={errors.worldId}
                            isValid={(dirtyFields.worldId && !errors.worldId)}
                    disabled={!doSubmit}
                    {...register('worldId', { required: true })}
                >
                    <option value=''>-- SELECT WORLD ---</option>
                    {worlds.map((w, k) => (<option key={k} value={w.id}>{w.name}</option>))}
                </Form.Control>
                {errors.worldId &&
                    <FormControl.Feedback type='invalid'>
                        {(errors.worldId.type === 'required') ? 'World Is Required' : errors.worldId.message}
                    </FormControl.Feedback>
                }
            </Form.Group>
            {doSubmit &&
                <>
                    <Row>
                        <Col>
                            <hr/>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <ButtonGroup>
                                <Button variant='secondary' onClick={doCancel} href={cancelHref} size='lg'>Cancel</Button>
                                <button className='btn btn-primary btn-lg' type='submit' disabled={!isDirty || (isDirty && errors.length > 0)}>
                                    {(data) ? 'Edit Company' : 'Add Company'}
                                </button>
                            </ButtonGroup>
                        </Col>
                    </Row>
                </>
            }
        </Form>
    )
}

export default CompanyForm
