import React, { useState, useEffect, } from 'react'
import { useForm } from "react-hook-form"
import { Modal, Badge, Row, Col, Form, FormControl, ButtonGroup, Button, InputGroup, } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faCheckSquare, faGlobeAmericas, faInfo, faInfoCircle, faPencilAlt, faPlane, faPlaneDeparture, faSpellCheck, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Table, } from '@Components'
import Layouts from '@Layouts'
import classNames from 'classnames';

const guidRegex = /^[{]?[0-9a-fA-F]{8}-([0-9a-fA-F]{4}-){3}[0-9a-fA-F]{12}[}]?$/i;
const initialState = {
    onair_name: '',
    xp: '',
    level: '',
    level_xp: '',
    reputation: '',
    airline: '',
    roundedReputation: '',
    uuid: 'c3d8e51d-f2e9-4918-a286-c3f2cd5ab141',
    api_key: 'd17ea885-aad5-429b-9297-fe2e6deca5d9',
    world_slug: 'cumulus',
    aircraft_rent_level: '',
    checkride_level: '',
    creation_date: '',
    difficulty_level: '',
    disable_seats_config_check: '',
    enable_cargos_and_charters_loading_time: '',
    enable_employees_flight_duty_and_sleep: '',
    enable_landing_penalities: '',
    enable_sim_failures: '',
    enable_skill_tree: '',
    force_time_in_simulator: '',
    in_survival: '',
    last_connected: '',
    last_report_date: '',
    pay_bonus_factor: '',
    realistic_sim_procedures: '',
    transport_employee_instant: '',
    transport_player_instant: '',
    use_only_vanilla_airports: '',
    use_small_airports: '',
    sync_company: true,
    sync_fleet: false,
    sync_employees: false,
    sync_flights: false,
    sync_fbos: false,
    sync_cashflow: false
}

function CompanyForm({ data, worlds, doSubmit = null, doCancel, cancelHref, }) {

    const [state, setState] = useState(initialState)

    const {
        onair_name,
        xp,
        level,
        level_xp,
        reputation,
        airline,
        roundedReputation,
        uuid,
        api_key,
        world_slug,
        sync_company,
        sync_fleet,
        sync_employees,
        sync_flights,
        sync_fbos,
        sync_cashflow,
        aircraft_rent_level,
        checkride_level,
        creation_date,
        difficulty_level,
        disable_seats_config_check,
        enable_cargos_and_charters_loading_time,
        enable_employees_flight_duty_and_sleep,
        enable_landing_penalities,
        enable_sim_failures,
        enable_skill_tree,
        force_time_in_simulator,
        in_survival,
        last_connected,
        last_report_date,
        pay_bonus_factor,
        realistic_sim_procedures,
        transport_employee_instant,
        transport_player_instant,
        use_only_vanilla_airports,
        use_small_airports,
    } = state

    const toggleOnAirName = (e) => {
        e.preventDefault();

        setState({
            onAirName: !onAirName,
        })
    }

    const onHandleChange = (event) => {
        const {
            name,
            type,
            checked,
            value,
        } = event.target;

        const newState = Object.assign({}, state, {
            [name]: (type === 'checkbox') ? checked : value
        })

        setState(newState);
    }

    const { register, handleSubmit, watch, formState: { dirtyFields, isDirty, isValid, isSubmitting, errors, ...formState }, ...formProps } = useForm({
        defaultValues: {
            uuid: (data) ? data.uuid : '',
            api_key: (data) ? data.api_key : '',
            worldId: (data) ? data.world_id : '',
            sync_company: (data) ? (data.sync_company === 1) ? true : false : true,
            sync_fleet: (data) ? (data.sync_fleet === 1) ? true : false : false,
            sync_employees: (data) ? (data.sync_employees === 1) ? true : false : false,
            sync_flights: (data) ? (data.sync_flights === 1) ? true : false : false,
            sync_fbos: (data) ? (data.sync_fbos === 1) ? true : false : false,
            sync_cashflow: (data) ? (data.sync_cashflow === 1) ? true : false : false,
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
            <Row>
                <Col>
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
                </Col>
            </Row>
            <Row>
                <Col md={6}>
                    <Form.Group>
                        <Form.Check
                            type='switch'
                            id='sync_company'
                            value={data.sync_company}
                            name='sync_company'
                            label='Refresh Company'
                            onChange={onHandleChange}
                            disabled={false}
                        />
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group>
                        <Form.Check
                            type='switch'
                            id='sync_fbos'
                            value={data.sync_fbos}
                            name='sync_fbos'
                            label='Refresh FBOs'
                            onChange={onHandleChange}
                            disabled={false}
                        />
                    </Form.Group>
                </Col>
            </Row>
            <Row>

                <Col md={6}>
                    <Form.Group>
                        <Form.Check
                            type='switch'
                            id='sync_employees'
                            value={data.sync_employees}
                            name='sync_employees'
                            label='Refresh Employees'
                            onChange={onHandleChange}
                            disabled={false}
                        />
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group>
                        <Form.Check
                            type='switch'
                            id='sync_cashflow'
                            value={data.sync_cashflow}
                            name='sync_cashflow'
                            label='Refresh Cash Flow'
                            onChange={onHandleChange}
                            disabled={false}
                        />
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col md={6}>
                    <Form.Group>
                        <Form.Check
                            type='switch'
                            id='sync_fleet'
                            value={data.sync_fleet}
                            name='sync_fleet'
                            label='Refresh Fleet'
                            onChange={onHandleChange}
                            disabled={false}
                        />
                    </Form.Group>
                </Col>
                <Col md={6}>

                </Col>
            </Row>
            <Row>
                <Col md={6}>
                    <Form.Group>
                        <Form.Check
                            type='switch'
                            id='sync_flights'
                            value={data.sync_flights}
                            name='sync_flights'
                            label='Refresh Flights'
                            onChange={onHandleChange}
                            disabled={false}
                        />
                    </Form.Group>
                </Col>
                <Col md={6}>

                </Col>
            </Row>
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
