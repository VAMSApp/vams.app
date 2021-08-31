import React from 'react';
import { Container, Row, Col, }from 'react-bootstrap';

export default function AuthenticatingLayout({ children }) {
    return (<div id='AuthenticatingLayout'>
        <Container>
            {children}
        </Container>
    </div>);
}
