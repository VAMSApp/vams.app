import React, { useState, } from 'react'
import { Container, Badge, Row, Col, ButtonGroup, Button, Modal, } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faCheckSquare, faInfo, faInfoCircle, faPencilAlt, faPlane, faPlaneDeparture, faRedoAlt, faSpellCheck, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { Table, FormattedDate } from '@Components'

function CompanyTable({ refreshCompany, data, ...props }) {
    const [isRefreshing, toggleIsRefreshing] = useState(false)

    const doRefreshCompany = (e, r) => {
        toggleIsRefreshing(!toggleIsRefreshing)
        refreshCompany(e, r.id)
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
                            <Button onClick={(e) => doRefreshCompany(e, row)}>
                                <FontAwesomeIcon icon={(isRefreshing) ? faSpinner : faRedoAlt} spin={(isRefreshing)} />
                            </Button>
                        </ButtonGroup>
                    </span>)
                }
            },
        ]
    );

    return (
        <div>
            <Table
                    data={data}
                    columns={columns}
                />
        </div>
    )
}

export default CompanyTable
