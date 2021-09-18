import React, { useState, useEffect, } from 'react'
import { Container, Row, Col, Form, Button, ButtonGroup, } from 'react-bootstrap'
import Layouts from '@Layouts'
import { Logo, } from '@Components'
import NotificationForm from './NotificationForm'
import './homeStyles.scss'

export default function Home({ appTitle, pageTitle, isEnrolled, }) {

    return (
        <Layouts.Guest
            appTitle={appTitle}
            pageTitle={pageTitle}
        >
            <Container>
                <div className='form-interested'>
                    <Row>
                        <Col>
                            <div id="LogoContainer">
                                <Logo height={100} light />
                                <h1>VAMS <span><strong>is</strong> Coming soon...</span></h1>
                            </div>
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
                            <p>Thank you for Signing up, we will let you know via email when enrollments are open!</p>
                        </Col>
                      </Row>)
                    : (<>
                        <Row>
                            <Col>
                                <p>Fill out the form below to get notified when registrations are <strong>open</strong>!</p>
                            </Col>
                        </Row>
                        <NotificationForm />
                      </>)
                    }
                </div>
            </Container>
        </Layouts.Guest>
    )
}
