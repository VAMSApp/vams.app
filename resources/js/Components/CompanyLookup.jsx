import React, { useEffect, useState } from 'react'
import { Row, Col, Button, Alert, Form, ButtonGroup, FormControl, ProgressBar, } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRedoAlt } from '@fortawesome/free-solid-svg-icons'
import StarRatings from 'react-star-ratings'
import { Api } from '@/Middleware'

const guidRegex = /^[{]?[0-9a-fA-F]{8}-([0-9a-fA-F]{4}-){3}[0-9a-fA-F]{12}[}]?$/i;

export function CompanyLookup({ onCompanyLookup, worlds, }) {
    const initialState = {
        company_uuid: '',
        api_key: '',
        world_slug: '',
        company_identifier: '',
        onair_name: '',
        xp: 0,
        level: 1,
        level_xp: 1000,
        reputation: undefined,
        roundedReputation: undefined,
        isLoading: false,
        hasError: false,
        errors: undefined,
    }

    let formState = localStorage.getItem('companyState');
    formState = JSON.parse(formState);

    const [state, setState] = useState(formState || initialState);

    const {
        company_uuid,
        api_key,
        world_slug,
        company_identifier,
        onair_name,
        xp,
        level_xp,
        level,
        reputation,
        roundedReputation,
        hasError,
        errors,
        isLoading,
    } = state

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

        Api.requestCompanyDetails(world_slug, api_key, company_uuid)
        .then((response) => {
            console.log(response);
            setState({
                ...state,
                isLoading: false,
                company_uuid: response.uuid,
                company_identifier: response.airline,
                onair_name: response.onair_name,
                xp: response.xp,
                level: response.level,
                level_xp: response.level * 1000,
                reputation: response.reputation,
            })

            onCompanyLookup({
                company_uuid,
                world_slug,
                api_key,
            });
        })
        .catch((error) => {
            console.error(error);
            setState({
                ...state,
                isLoading: false,
                hasError: true,
                error
            })
        })
    }

    useEffect(() => {
        localStorage.setItem('companyState', JSON.stringify(state));
    }, [state]);

    return (
        <div id='CompanyLookup'>
            <Row>
                <Col md={6}>
                    <Row>
                        <Col md={6}>
                            <Form.Group>
                                <Form.Label>Company Unique ID (UUID)</Form.Label>
                                <Form.Control type='text' name='company_uuid' placeholder='company_uuid' value={company_uuid} onChange={onHandleChange} />
                                <Form.Text muted>
                                    Located in the lower left of the Global settings screen within tOnAir
                                </Form.Text>
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group>
                                <Form.Label>Company API Key</Form.Label>
                                <Form.Control type='text' name='api_key' placeholder='api_key' value={api_key} onChange={onHandleChange} />
                                <Form.Text muted>
                                    Located in the lower left of the Global settings screen within tOnAir
                                </Form.Text>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Form.Group>
                            <Form.Label>OnAir World</Form.Label>
                            <select id='world_slug' name='world_slug' className='form-control' onChange={onHandleChange} value={world_slug}>
                                <option value=''>-- SELECT WORLD --</option>
                                {worlds.map((w, k) => (<option key={k} value={w.slug}>{w.name}</option>))}
                            </select>
                        </Form.Group>
                    </Row>
                    <Row>
                        <Col>
                            <hr />
                            <button className='btn btn-info btn-block' onClick={loadCompanyDetails} disabled={(!company_uuid && !api_key && !world_slug)}>
                                {(isLoading)
                                ? (<FontAwesomeIcon icon={faRedoAlt} spin />)
                                : 'Load Company Details'
                                }
                            </button>
                        </Col>
                    </Row>
                </Col>

                <Col md={6}>
                    <Row>
                        <Form.Group as={Col} md={2}>
                            <Form.Label>Identifier</Form.Label>
                            <Form.Control
                                type='text'
                                name='company_identifier'
                                value={company_identifier}
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
                </Col>
            </Row>
        </div>
    )
}

export default CompanyLookup
