import React, { useState, useEffect, } from 'react'
import { Inertia } from '@inertiajs/inertia'
import { Container, Badge, Row, Col, ButtonGroup, Button, Modal, } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faCheckSquare, faInfo, faInfoCircle, faPencilAlt, faPlane, faPlaneDeparture, faRedoAlt, faSpellCheck } from '@fortawesome/free-solid-svg-icons';
import { Table, FormattedDate, Company, } from '@Components'
import Layouts from '@Layouts'

export function ListPage({ auth, menus, errors, appTitle, pageTitle, companies, roles, ...props}) {

    const refreshCompany = async (e, companyId) => {
        e.preventDefault()
        const url = route('company.refresh', { id: companyId })
        const payload = { id: companyId }

        Inertia.post(url, payload)
    }

    return (
        <Layouts.Authenticated
            auth={auth}
            menus={menus}
            errors={errors}
            appTitle={appTitle}
            pageTitle={pageTitle}
        >
            {(companies && companies.length > 0) &&
                <Company.Table
                    data={companies}
                    refreshCompany={refreshCompany}
                />
            }
            <Button href={route('company.create')} variant='primary' size='lg'>Add New Company</Button>
        </Layouts.Authenticated>
    );
}

export default ListPage
