import React, { useState, useEffect, } from 'react'
import { Inertia } from '@inertiajs/inertia'
import { Container, Badge, Row, Col, ButtonGroup, Button, Modal, } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faCheckSquare, faInfo, faInfoCircle, faPencilAlt, faPlane, faPlaneDeparture, faRedoAlt, faSpellCheck } from '@fortawesome/free-solid-svg-icons';
import { Table, FormattedDate } from '@Components'
import { Company, } from '@Components/Admin'
import Layouts from '@Layouts'

export function ListPage({ auth, menus, errors, appTitle, pageTitle, companies, roles, ...props}) {

    const refreshCompany = (e, companyId) => {
        e.preventDefault();
        Inertia.post(route('company.refresh', { id: companyId }), { id: companyId });
    }

    const columns = React.useMemo(
        () => [
            {
                Header: 'Airline (ICAO)',
                id: 'airline',
                sortType: 'alphanumeric',
                isSorted: true,
                className: 'text-center',
                Cell: ({ row }) => (<a href={route('company.show', { id: row.original.id })}>
                    {row.original.airline}
                </a>)
            },
            {
                Header: 'name',
                id: 'onair_name',
                sortType: 'alphanumeric',
                isSorted: true,
                Cell: ({ row }) => (<span>
                    {(row.original.name) ? row.original.name : row.original.onair_name}
                </span>)
            },
            {
                Header: 'World',
                accessor: 'world.name',
                sortType: 'alphanumeric',
                isSorted: true,
            },
            {
                Header: 'Last Updated',
                id: 'last_updated',
                sortType: 'alphanumeric',
                isSorted: true,
                Cell: ({ row }) => (<FormattedDate date={row.original.updated_at} />)
            },
            {
                Header: '',
                id: 'actions',
                sortType: 'alphanumeric',
                isSorted: true,
                Cell: ({ row, }) => {

                    return (<span>
                        <ButtonGroup>
                            <Button onClick={(e) => refreshCompany(e, row.original.id)}>
                                <FontAwesomeIcon icon={faRedoAlt} />
                            </Button>
                        </ButtonGroup>
                    </span>)
                }
            },
        ]
    );

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
                />
            }
            <Button href={route('company.create')} variant='primary' size='lg'>Add New Company</Button>
        </Layouts.Authenticated>
    );
}

export default ListPage
