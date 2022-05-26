import React, { useEffect, useState, } from 'react'
import { Inertia } from '@inertiajs/inertia'
import { Button, ButtonGroup, Row, Col, Form, } from 'react-bootstrap'
import Layouts from '@Layouts'
import CompanyForm from './Form'
import { CompanyEmployeesTable, } from '@Components/Company'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRedoAlt } from '@fortawesome/free-solid-svg-icons'

function ShowPage({ auth, menus, appTitle, pageTitle, company, worlds, errors, ...props}) {
    const initialState = {
        isRefreshing: false,
        data: undefined,
    }

    const [state, setState] = useState(initialState)

    const {
        isRefreshing,
        id,
        data,
    } = state

    const refreshCompany = (e) => {
        e.preventDefault()

        setState({
            ...state,
            isRefreshing: true
        })

        const url = route('company.refresh');
        console.log(url);
        Inertia.post(url, { id: company.id });
        // refreshCompanyDetails(data.id)
        //     .then((response) => {
        //         setState({
        //             ...state,
        //             isRefreshing: false,
        //             data: {
        //                 ...data,
        //                 ...response,
        //             }
        //         })
        //     })
    }

    useEffect(() => {
        setState({
            ...state,
            data: {
                ...company
            }

        })
    }, [company])

    return (
        <Layouts.Authenticated
            auth={auth}
            menus={menus}
            errors={errors}
            appTitle={appTitle}
            pageTitle={pageTitle}
        >
            {data &&
            <div>
                <Row>
                    <Col md={2}>
                        <Form.Group>
                            <Form.Label>Company ICAO</Form.Label>
                            <Form.Control
                                value={company.airline}
                                disabled
                            />
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
                                                    value={company.name}
                                                    disabled
                                                />
                                            </>)
                                            : (<>
                                                <Form.Control
                                                    value={company.onair_name}
                                                    disabled
                                                />
                                            </>)
                                        }
                                    </InputGroup>)
                                    : (<>
                                        <Form.Control
                                            value={company.onair_name}
                                            disabled
                                        />
                                    </>)
                            }

                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={3}>
                        <Form.Group>
                            <Form.Label>Company UUID</Form.Label>
                            <Form.Control
                                value={company.uuid}
                                disabled
                            />
                        </Form.Group>
                    </Col>
                    <Col md={3}>
                        <Form.Group>
                            <Form.Label>Company API Key</Form.Label>
                            <Form.Control
                                value={company.api_key}
                                disabled
                            />
                        </Form.Group>
                    </Col>
                    <Col md={3}>
                        <Form.Group>
                            <Form.Label>World</Form.Label>
                            <Form.Control
                                value={company.world.name}
                                disabled
                            />
                        </Form.Group>
                    </Col>
                    <Col md={3}>
                        <Form.Group>
                            <Form.Label>Last Refreshed</Form.Label>
                            <Form.Control
                                value={company.updated_at}
                                disabled
                            />
                        </Form.Group>
                    </Col>
                </Row>
            </div>
            }
            <Row>
                <Col>
                    <hr />
                </Col>
            </Row>
            <Row>
                <Col>
                    <h2>Company Employee's</h2>
                </Col>
            </Row>
            <Row>
                <Col>
                    <CompanyEmployeesTable
                        data={company.employees}
                    />
                </Col>
            </Row>
            <ButtonGroup>
                <Button href={route('company.index')} variant='secondary' size='lg'>Go Back</Button>
                <Button variant='primary' size='lg' onClick={refreshCompany} disabled={isRefreshing}>
                    {(isRefreshing)
                        ? (<FontAwesomeIcon icon={faRedoAlt} />)
                        : 'Refresh OnAir'
                    }
                </Button>
                <Button href={route('company.edit', { id: company.id })} variant='warning' size='lg'>Edit Company</Button>
            </ButtonGroup>
        </Layouts.Authenticated>
    )
}

export default ShowPage
