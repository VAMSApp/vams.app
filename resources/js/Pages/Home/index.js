import React, { useState, useEffect, } from 'react'
import { Container, Row, Col, Form, Button, ButtonGroup, } from 'react-bootstrap'
import Layouts from '@Layouts'
import { Logo, } from '@Components'
import NotificationForm from './NotificationForm'
import './homeStyles.scss'

export default function Home({ appTitle, pageTitle, isEnrolled, simTypes, }) {

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
                                <h1 className='h2'>VAMS <span><strong>is</strong> coming soon...</span></h1>
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <hr />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <p className='lead text-center'><strong>V</strong>irtual <strong>A</strong>irline <strong>M</strong>anagement <strong>S</strong>ystem.</p>
                        <p>Will provide direct connection functionality to Flight simulators and a tool to manage all aspects of your virtual airline, from employee's, certifications, aircraft fleet, FBO's, and Job's.</p>
                        <p>VAMS will also provide functionality for <span className='text-emphasis'>syncronization</span> and import of data from various VA systems such as; <a href='https://www.onair.company/' target='_blank'>OnAir company</a>.</p>
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
                                <p>Fill out the form below to get notified when alhpa enrollment's are <strong>available</strong>!</p>
                            </Col>
                        </Row>
                        <NotificationForm simTypes={simTypes} />
                      </>)
                    }
                </div>
            </Container>
        </Layouts.Guest>
    )
}
