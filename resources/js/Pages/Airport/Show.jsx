import React, { useEffect, useState, } from 'react'
import { Inertia } from '@inertiajs/inertia'
import { Button, ButtonGroup, Row, Col, Tab, Tabs, } from 'react-bootstrap'
import Layouts from '@Layouts'
import { AirportEmployeesTable, } from '@Components/Airport'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRedoAlt } from '@fortawesome/free-solid-svg-icons'

function ShowPage({ auth, menus, appTitle, pageTitle, airport, worlds, errors, ...props}) {

    return (<Layouts.Authenticated
        auth={auth}
        menus={menus}
        errors={errors}
        appTitle={appTitle}
        pageTitle={pageTitle}
    >
        {airport &&
        <div>
            <Tabs
                defaultActiveKey='employees_current'
                id='employees_tab'
                className='mb-3'
            >

                {airport.employees_current &&
                <Tab eventKey='employees_current' title={`At Airport`}>
                    <Row>
                        <Col>
                            <h3>{`Employee's Currently at ${airport.icao}`}</h3>
                            <AirportEmployeesTable
                                current_airport={airport}
                                data={airport.employees_current}
                            />
                        </Col>
                    </Row>
                </Tab>
                }
                {airport.employees_home &&
                <Tab eventKey='employees_home' title={`Employee's Home Base`}>
                    <Row>
                        <Col>
                            <h3>{`Employee's Home Base at ${airport.icao}`}</h3>
                            <AirportEmployeesTable
                                current_airport={airport}
                                data={airport.employees_home}
                            />
                        </Col>
                    </Row>
                </Tab>
                }
            </Tabs>
        </div>
        }
    </Layouts.Authenticated>)
}

export default ShowPage
