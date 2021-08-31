import React from 'react'
import { Container, Row, Col, } from 'react-bootstrap'
import Layouts from '@Layouts'

export function ListPage({ auth, errors, appTitle, pageTitle, users, ...props}) {
    return (
        <Layouts.Authenticated
            auth={auth}
            errors={errors}
            appTitle={appTitle}
            pageTitle={pageTitle}
        >
        <p>User list content here!</p>
        </Layouts.Authenticated>
    );
}


export default ListPage
