import React, { useState, useEffect, } from 'react'
import { Inertia } from '@inertiajs/inertia'
import { Container, Row, Col, Nav, NavDropdown, Form, Button, ButtonGroup, ListGroup, Modal, } from 'react-bootstrap'
import Layouts from '@Layouts'
import { Logo, } from '@Components'
import NotificationForm from './NotificationForm'
import './homeStyles.scss'
import { isNull } from 'lodash'

export default function Home({ auth: { isAdmin, user, }, appTitle, pageTitle, isEnrolled, allowRegistration, simTypes, }) {
    const [notificationFormIsVisible, setNotificationFormModal] = useState(false);

    const toggleNotificationFormModal = () => setNotificationFormModal(!notificationFormIsVisible)

    const doLogout = () => {
        Inertia.post(route('logout'))
    }

    return (
        <Layouts.Guest
            appTitle={appTitle}
            pageTitle={pageTitle}
        >
            <Container>
                <Row>
                    <Col md={6}>
                        <Nav
                            variant='pills'
                            defaultActiveKey={route('home')}
                            className='pt-3 justify-content-left'
                        >
                            <Nav.Item>
                                <Nav.Link
                                    className='btn btn-lg'
                                    href={route('home')}
                                >
                                    Home
                                </Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>
                    <Col md={6}>
                        <Nav
                            variant='pills'
                            className='pt-3 justify-content-end'
                        >
                            <Nav.Item>
                                {(user)
                                    ? (<NavDropdown
                                        title={`Hello ${user.username}`}
                                        id="user-nav-dropdown" className='btn btn-lg btn-outline-secondary'
                                    >
                                    <NavDropdown.Item
                                        href={route('profile')}
                                    >
                                            Profile
                                    </NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item onClick={doLogout}>
                                        Logout
                                    </NavDropdown.Item>
                                  </NavDropdown>)
                                    : (<ButtonGroup>
                                        <Nav.Link
                                            className='btn btn-lg btn-light'
                                            href={route('login')}
                                        >
                                            Sign In
                                        </Nav.Link>
                                        {allowRegistration &&
                                        <Nav.Link
                                        className='btn btn-lg btn-info'
                                        href={(allowRegistration) ? route('register') : ''}
                                        >
                                            Register
                                        </Nav.Link>
                                        }
                                    </ButtonGroup>)
                                }
                            </Nav.Item>
                        </Nav>
                    </Col>
                </Row>
                <div className='form-interested' id='LandingContainer'>
                <Row>
                    <Col>
                        <div className='LogoContainer'>
                            <div className='logo inline'>
                                <Logo height={100} light />
                            </div>
                            <div className='logoText inline'>
                                <h1 className='h2'>VAMS</h1>
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <h3 className='lead text-center'><em>V</em>irtual <em>A</em>irline <em>M</em>anagement <em>S</em>ystem</h3>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <hr />
                    </Col>
                </Row>
                <Row>
                    <Col md={6} className='text-left'>
                        <h4>Planned Features</h4>
                        <ListGroup>
                            <ListGroup.Item>Fleet/Aircraft Management</ListGroup.Item>
                            <ListGroup.Item>Cargo, and Passenger Job Generation</ListGroup.Item>
                            <ListGroup.Item>Live Flight Tracking</ListGroup.Item>
                        </ListGroup>
                    </Col>
                    <Col md={6} className='text-left'>
                        <h4>Third Party VA Integrations</h4>
                        <ListGroup>
                            <ListGroup.Item>Import Career, Aircraft, Flights, Cashflow, Employees, FBOs from <a href='https://www.onair.company/' target='_blank'>OnAir company</a></ListGroup.Item>
                            <ListGroup.Item>Import Career, Aircraft, Navdata from Neofly</ListGroup.Item>
                        </ListGroup>
                    </Col>
                </Row>
                {(isEnrolled || allowRegistration)
                ? (<Row>
                    <Col>
                        <hr />
                    </Col>
                </Row>)
                : (<>
                    <Row>
                        <Col>
                            <hr />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Button variant='primary' block onClick={toggleNotificationFormModal}>Interested? Click to get notified when registration opens</Button>
                        </Col>
                    </Row>
                    <NotificationForm
                        simTypes={simTypes}
                        toggleModal={toggleNotificationFormModal}
                        isVisible={notificationFormIsVisible}
                    />
                    <Row>
                        <Col>
                            <hr />
                        </Col>
                    </Row>
                    <Row>
                        <Col className='text-align-center'>
                            <p>Copyright 2022 vams.app | <a href='https://twitter.com/vamsapp' target='_blank'>@vamsapp</a> | <a href='https://github.com/vams-app' target='_blank'>Github</a>
                            </p>
                        </Col>
                    </Row>
                    </>)
                }
                </div>
            </Container>
        </Layouts.Guest>
    )
}
