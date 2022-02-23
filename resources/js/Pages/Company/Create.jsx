import React, { useState, useEffect, useRef, } from 'react'
import { Inertia } from '@inertiajs/inertia'
import { Modal, Button, Row, Col, Form, FormCheck, ProgressBar, } from 'react-bootstrap'
import classNames from 'classnames'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRedoAlt } from '@fortawesome/free-solid-svg-icons'
import StarRatings from 'react-star-ratings'
import { Api } from '@/Middleware'
import { Table, } from '@Components'
import Layouts from '@Layouts'
import { Input, Checkbox, ValidationErrors, } from '@Components/Form'

const guidRegex = /^[{]?[0-9a-fA-F]{8}-([0-9a-fA-F]{4}-){3}[0-9a-fA-F]{12}[}]?$/i;

function NotLoadedPlaceholder ({ visible, width, height, text, style, textStyle, children }) {
    let _style = {
        width: `${width}px`,
        minHeight: `${height}px`,
        textAlign: 'center',
        backgroundColor: 'rgb(0 0 0 / 84%)',
        float: 'left',
        position: 'absolute',
        zIndex: 9999,
    }

    let _textStyle = {
        marginTop: '25%',
        color: '#ffffff'
    }

    if (style) {
        _style = {
            ..._style,
            ...style
        }
    }

    return (visible)
     ? (<div id='NotLoadedPlaceholder' style={_style}>
        <h4 style={textStyle || _textStyle}>{text}</h4>
    </div>)
    : null
}

const initialState = {
    onair_name: '',
    xp: '',
    level: '',
    level_xp: '',
    reputation: '',
    airline: '',
    roundedReputation: '',
    uuid: '',
    api_key: '',
    world_slug: '',
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
    sync_cashflow: false,
    isLoading: false,
    isLoaded: false,
}

function CreatePage({ auth, menus, appTitle, pageTitle, worlds, errors, ...props}) {
    // let formState = localStorage.getItem('companyState');
    // formState = JSON.parse(formState);

    const [state, setState] = useState(initialState);

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
        isLoading,
        isLoaded,
    } = state

    const doSubmit = (e) => {
        e.preventDefault();

        let values = {
            uuid,
            api_key,
            world_slug,
            sync_company,
            sync_fleet,
            sync_employees,
            sync_flights,
            sync_fbos,
            sync_cashflow,
        };

        console.log('doSubmit()', values);

        Inertia.post('/company/create', values)
    }

    const doCancel = (e) => {
        console.log('doCancel()');
    }

    const onHandleChange = (event) => {
        const {
            name,
            type,
            checked,
            value,
        } = event.target;

        setState({
            ...state,
            [name]: (type === 'checkbox') ? checked : value
        })
    }

    const loadCompanyDetails = (e) => {
        e.preventDefault()

        setState({
            ...state,
            isLoading: true,
        })

        Api.requestCompanyDetails(world_slug, api_key, uuid)
        .then((response) => {
            setState({
                ...state,
                isLoading: false,
                isLoaded: true,
                onair_name: response.onair_name,
                xp: response.xp,
                level: response.level,
                level_xp: response.level * 1000,
                reputation: response.reputation,
                airline: response.airline,
                roundedReputation: response.roundedReputation,
                aircraft_rent_level: response.aircraft_rent_level,
                checkride_level: response.checkride_level,
                creation_date: response.creation_date,
                difficulty_level: response.difficulty_level,
                disable_seats_config_check: response.disable_seats_config_check,
                enable_cargos_and_charters_loading_time: response.enable_cargos_and_charters_loading_time,
                enable_employees_flight_duty_and_sleep: response.enable_employees_flight_duty_and_sleep,
                enable_landing_penalities: response.enable_landing_penalities,
                enable_sim_failures: response.enable_sim_failures,
                enable_skill_tree: response.enable_skill_tree,
                force_time_in_simulator: response.force_time_in_simulator,
                in_survival: response.in_survival,
                last_connected: response.last_connected,
                last_report_date: response.last_report_date,
                pay_bonus_factor: response.pay_bonus_factor,
                realistic_sim_procedures: response.realistic_sim_procedures,
                transport_employee_instant: response.transport_employee_instant,
                transport_player_instant: response.transport_player_instant,
                use_only_vanilla_airports: response.use_only_vanilla_airports,
                use_small_airports: response.use_small_airports,
            })
        })
        .catch((error) => {
            console.error(error);
            setState({
                ...state,
                isLoading: false,
                isLoaded: true,
                hasError: true,
                error
            })
        })
    }

    // useEffect(() => {
    //     localStorage.setItem('companyState', JSON.stringify(state));
    // }, [state]);


    let companyDetailContainerRef = useRef();
    let syncContainerRef = useRef();

    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);
    const [syncWidth, setSyncWidth] = useState(0);
    const [syncHeight, setSyncHeight] = useState(0);

    useEffect(() => {
        setWidth(companyDetailContainerRef.current.getBoundingClientRect().width);
        setHeight(companyDetailContainerRef.current.getBoundingClientRect().height);
        setSyncWidth(syncContainerRef.current.getBoundingClientRect().width)
        setSyncHeight(syncContainerRef.current.getBoundingClientRect().height)
    },[])


    return (
        <Layouts.Authenticated
            auth={auth}
            menus={menus}
            errors={errors}
            appTitle={appTitle}
            pageTitle={pageTitle}
        >
            {/* <CompanyForm worlds={worlds} doSubmit={doSubmit} doCancel={doCancel} /> */}
            <Row>
                <Col>
                    <form>
                        <Row>
                            <Col md={6} ref={companyDetailContainerRef}>
                                <Row>
                                    <h3>Step 1 - Enter OnAir API Details</h3>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <Form.Group>
                                            <Form.Label>Company Unique ID (UUID)</Form.Label>
                                            <Form.Control
                                                type='text'
                                                name='uuid'
                                                placeholder='uuid'
                                                value={uuid}
                                                onChange={onHandleChange}
                                            />
                                            <Form.Text muted>
                                                Located in the lower left of the Global settings screen within tOnAir
                                            </Form.Text>
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group>
                                            <Form.Label>Company API Key</Form.Label>
                                            <Form.Control
                                                type='text'
                                                name='api_key'
                                                placeholder='api_key'
                                                value={api_key}
                                                onChange={onHandleChange}
                                            />
                                            <Form.Text muted>
                                                Located in the lower left of the Global settings screen within tOnAir
                                            </Form.Text>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Group>
                                            <Form.Label>OnAir World</Form.Label>
                                            <select id='world_slug' name='world_slug' className='form-control' onChange={onHandleChange} value={world_slug}>
                                                <option value=''>-- SELECT WORLD --</option>
                                                {worlds.map((w, k) => (<option key={k} value={w.slug}>{w.name}</option>))}
                                            </select>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <hr />
                                        <button className='btn btn-info btn-block' onClick={loadCompanyDetails} disabled={(!uuid && !api_key && !world_slug)}>
                                            {(isLoading)
                                            ? (<FontAwesomeIcon icon={faRedoAlt} spin />)
                                            : 'Step 2 - Click Me to Preview Company Details'
                                            }
                                        </button>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <hr />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <h3 className={classNames({'text-muted': !isLoaded })}>Step 3 - Set OnAir Refresh Settings</h3>
                                    </Col>
                                </Row>
                                {!isLoaded &&
                                <Row>
                                    <NotLoadedPlaceholder
                                     width={syncWidth}
                                     height={syncHeight}
                                     visible={!isLoaded}
                                     text='Complete Steps 1 and 2 First'
                                     style={{
                                         float: 'left',
                                         position: 'absolute',
                                     }}
                                     textStyle={{
                                        marginTop: '40px',
                                        color: '#FFFFFF'
                                     }}
                                    />
                                </Row>
                                }
                                <div ref={syncContainerRef}>
                                    <Row>
                                        <Col md={6}>
                                            <Form.Group>
                                                <FormCheck
                                                    type='switch'
                                                    id='sync_company'
                                                    value={sync_company}
                                                    name='sync_company'
                                                    label='Refresh Company'
                                                    checked={sync_company}
                                                    onChange={onHandleChange}
                                                    disabled={!isLoaded}
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col md={6}>
                                            <Form.Group>
                                                <FormCheck
                                                    type='switch'
                                                    id='sync_fbos'
                                                    value={sync_fbos}
                                                    name='sync_fbos'
                                                    label='Refresh FBOs'
                                                    checked={sync_fbos}
                                                    onChange={onHandleChange}
                                                    disabled={!isLoaded}
                                                />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>

                                        <Col md={6}>
                                            <Form.Group>
                                                <FormCheck
                                                    type='switch'
                                                    id='sync_employees'
                                                    value={sync_employees}
                                                    name='sync_employees'
                                                    label='Refresh Employees'
                                                    checked={sync_employees}
                                                    onChange={onHandleChange}
                                                    disabled={!isLoaded}
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col md={6}>
                                            <Form.Group>
                                                <FormCheck
                                                    type='switch'
                                                    id='sync_cashflow'
                                                    value={sync_cashflow}
                                                    name='sync_cashflow'
                                                    label='Refresh Cash Flow'
                                                    checked={sync_cashflow}
                                                    onChange={onHandleChange}
                                                    disabled={!isLoaded}
                                                />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={6}>
                                            <Form.Group>
                                                <FormCheck
                                                    type='switch'
                                                    id='sync_fleet'
                                                    value={sync_fleet}
                                                    name='sync_fleet'
                                                    label='Refresh Fleet'
                                                    checked={sync_fleet}
                                                    onChange={onHandleChange}
                                                    disabled={!isLoaded}
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col md={6}>

                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={6}>
                                            <Form.Group>
                                                <FormCheck
                                                    type='switch'
                                                    id='sync_flights'
                                                    value={sync_flights}
                                                    name='sync_flights'
                                                    label='Refresh Flights'
                                                    checked={sync_flights}
                                                    onChange={onHandleChange}
                                                    disabled={!isLoaded}
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col md={6}>

                                        </Col>
                                    </Row>
                                </div>
                            </Col>
                            <Col md={6}>
                                <Row>
                                    <h3>OnAir Company Details</h3>
                                </Row>
                                {!isLoaded &&
                                    <Row>
                                        <NotLoadedPlaceholder width={width} height={height} visible={!isLoaded} text='Complete Steps 1 and 2 First' />
                                    </Row>
                                }
                                {isLoaded &&
                                <>
                                    <Row>
                                        <Form.Group as={Col} md={2}>
                                            <Form.Label>Identifier</Form.Label>
                                            <Form.Control
                                                type='text'
                                                name='airline'
                                                value={airline}
                                                placeholder='ICAO'
                                                disabled
                                            />
                                        </Form.Group>
                                        <Form.Group as={Col} md={10}>
                                            <Form.Label>Company Name</Form.Label>
                                            <Form.Control
                                                type='text'
                                                name='onair_name'
                                                value={onair_name}
                                                placeholder='Company Name'
                                                disabled
                                            />
                                        </Form.Group>
                                    </Row>
                                    {reputation &&
                                    <>
                                    <Row>
                                        <Col md={3}>
                                            <Form.Label>{`Reputation (${(reputation * 100).toFixed(1)}%)`}</Form.Label>
                                        </Col>
                                        <Col md={9}>
                                            <Form.Label>{`Level ${level} ${xp}/${level_xp}`}</Form.Label>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={3}>
                                            <StarRatings
                                                rating={(reputation) ? reputation * 5 : null}
                                                numberOfStars={5}
                                                startDateedColor="blue"
                                                name='reputation'
                                                starWidthAndHeight='10px'
                                                starDimension='20px'
                                                starSpacing='1px'
                                            />
                                        </Col>
                                        <Col md={9}>
                                            <ProgressBar
                                                min={0}
                                                max={level_xp}
                                                now={xp}
                                                variant='info'
                                            />
                                        </Col>
                                    </Row>
                                    </>
                                    }
                                </>
                                }
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <hr />
                                <div className="d-grid gap-4 p-1">
                                    <Button variant={(isLoaded) ? 'success' : 'outline-dark'} onClick={doSubmit} disabled={!isLoaded}>
                                        Add Company
                                    </Button>
                                </div>
                            </Col>
                        </Row>
                    </form>
                </Col>
            </Row>
        </Layouts.Authenticated>
    )
}

export default CreatePage
