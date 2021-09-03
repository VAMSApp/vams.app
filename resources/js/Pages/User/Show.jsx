import React from 'react'
import { Container, Badge, Row, Col, ButtonGroup, } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faCheckSquare, faInfo, faInfoCircle, faPencilAlt, faPlane, faPlaneDeparture, faSpellCheck } from '@fortawesome/free-solid-svg-icons';
import { Table, } from '@Components'
import Layouts from '@Layouts'

function ShowPage({ auth, menus, errors, appTitle, pageTitle, user, ...props}) {
    return (
        <Layouts.Authenticated
            auth={auth}
            menus={menus}
            errors={errors}
            appTitle={appTitle}
            pageTitle={pageTitle}
        >
        {user &&
            <p>user content here</p>
        }
        </Layouts.Authenticated>
    )
}

export default Show
