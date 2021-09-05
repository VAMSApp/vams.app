import React from 'react'
import { useForm } from "react-hook-form"
import { Modal, Badge, Row, Col, Form, FormControl, ButtonGroup, Button, } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faCheckSquare, faInfo, faInfoCircle, faPencilAlt, faPlane, faPlaneDeparture, faSpellCheck, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Table, } from '@Components'
import Layouts from '@Layouts'
import classNames from 'classnames';

const guidRegex = /^[{]?[0-9a-fA-F]{8}-([0-9a-fA-F]{4}-){3}[0-9a-fA-F]{12}[}]?$/i;

function CompanyForm({ data, worlds, doSubmit = null, doCancel, cancelHref, }) {
    const { register, handleSubmit, watch, formState: { dirtyFields, isDirty, isValid, isSubmitting, errors, ...formState }, ...formProps } = useForm({
        defaultValues: {
            uuid: (data) ? data.uuid : '',
            apiKey: (data) ? data.api_key : '',
            worldId: (data) ? data.world_id : '',
        },
    })

    return (
        <Form onSubmit={handleSubmit(doSubmit)}>
            <Row>
                <Col md={6}>
                    <Form.Group>
                        <Form.Label>Company UUID</Form.Label>
                        <input
                            placeholder='c3d8e51d-f2e9-4918-a286-c3f2cd5ab141'
                            {...register('uuid', { required: true, pattern: guidRegex })}
                            className={classNames('form-control form-control-lg', {
                                'is-invalid': errors.uuid,
                                'is-valid': (dirtyFields.uuid && !errors.uuid)
                            })}
                            disabled={!doSubmit}
                            />
                            {errors.uuid &&
                                <FormControl.Feedback type='invalid'>{(errors.uuid.type === 'required') ? 'UUID Is Required' : errors.uuid.message}</FormControl.Feedback>
                            }
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group>
                        <Form.Label>Company API Key</Form.Label>
                        <input
                            placeholder='d17ea885-aad5-429b-9297-fe2e6deca5d9'
                            {...register('apiKey', { required: true, pattern: guidRegex })}
                            className={classNames('form-control form-control-lg', {
                                'is-invalid': errors.apiKey,
                                'is-valid': (dirtyFields.apiKey && !errors.apiKey)
                            })}
                            disabled={!doSubmit}
                            />
                            {errors.apiKey &&
                                <FormControl.Feedback type='invalid'>{(errors.apiKey.type === 'required') ? 'API Key Is Required' : errors.apiKey.message}</FormControl.Feedback>
                            }
                    </Form.Group>
                </Col>
            </Row>
            <Form.Group>
                <Form.Label>World</Form.Label>
                <select
                    className={classNames('form-control form-control-lg', {
                        'is-invalid': errors.worldId,
                        'is-valid': (dirtyFields.worldId && !errors.worldId)
                    })}
                    disabled={!doSubmit}
                    {...register('worldId', { required: true })}
                >
                    <option value=''>-- SELECT WORLD ---</option>
                    {worlds.map((w, k) => (<option key={k} value={w.id}>{w.name}</option>))}
                </select>
                {errors.worldId &&
                    <FormControl.Feedback type='invalid'>{(errors.worldId.type === 'required') ? 'World Is Required' : errors.worldId.message}</FormControl.Feedback>
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
