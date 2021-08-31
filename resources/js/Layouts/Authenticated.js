import React, { useState } from 'react';
import { Container, Row, Col, Navbar, Nav, NavDropdown }from 'react-bootstrap';
import { InertiaLink } from '@inertiajs/inertia-react';
import Helmet from 'react-helmet';
import Header from '@Components/Header';

export default function Authenticated({ auth, isAdmin, header, appTitle, pageTitle, children }) {
    return (<>
        <Helmet>
            <title>{`${appTitle} | ${pageTitle}`}</title>
        </Helmet>
        <Header auth={auth} isAdmin={isAdmin} logoText={appTitle} id='AuthenticatedHeader' />
        <Container fluid>
            <Row>
                <Col>
                    <h2>
                        {(header) ? header : pageTitle}
                    </h2>
                </Col>
            </Row>
            {children}
        </Container>
    </>);

}
