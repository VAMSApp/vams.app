import React, { useState } from 'react';
import { Container, Row, Col, Navbar, Nav, NavDropdown }from 'react-bootstrap';
import { InertiaLink } from '@inertiajs/inertia-react';
import Helmet from 'react-helmet';
import Header from '@Components/Header';

export default function Authenticated({ auth, menus, isAdmin, header, appTitle, pageTitle, children }) {
    return (<>
        <Helmet>
            <title>{`${appTitle} | ${pageTitle}`}</title>
        </Helmet>
        <Header auth={auth} menus={menus} isAdmin={isAdmin} logoText={appTitle} id='AuthenticatedHeader' />
        <Container fluid>
            <Row>
                <Col>
                    <h1>
                        {(header) ? header : pageTitle}
                    </h1>
                </Col>
            </Row>
            <Row>
                <Col>
                    <hr />
                </Col>
            </Row>
            {children}
        </Container>
    </>);

}
