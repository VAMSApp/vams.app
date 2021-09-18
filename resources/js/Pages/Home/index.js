import React, { useState, useEffect, } from 'react'
import { Container, Row, Col, Form, Button, ButtonGroup, ListGroup, Modal, } from 'react-bootstrap'
import Layouts from '@Layouts'
import { Logo, } from '@Components'
import NotificationForm from './NotificationForm'
import './homeStyles.scss'

export default function Home({ appTitle, pageTitle, isEnrolled, simTypes, }) {
    const [notificationFormIsVisible, setNotificationFormModal] = useState(false);

    const toggleNotificationFormModal = () => setNotificationFormModal(!notificationFormIsVisible)

    return (
        <Layouts.Guest
            appTitle={appTitle}
            pageTitle={pageTitle}
        >
            <Container>
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
                <Row>
                    <Col>
                        <hr />
                    </Col>
                </Row>
                    {(isEnrolled)
                    ? (<Row>
                        <Col>
                            <p>Thank you for Signing up, we will let you know via email when enrollments open up!</p>
                        </Col>
                      </Row>)
                    : (<>
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

                      </>)
                    }
                </div>
            </Container>
        </Layouts.Guest>
    )
}
