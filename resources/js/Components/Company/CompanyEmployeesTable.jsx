import React from 'react'
import { Container, Badge, Row, Col, ButtonGroup, Button, Modal, ProgressBar, OverlayTrigger, Tooltip, } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faPlane, faAnchor, faCheckCircle, faCheckSquare, faInfo, faInfoCircle, faPencilAlt, faCircle, faPlaneDeparture, faRedoAlt, faSpellCheck, faDotCircle, faMoon } from '@fortawesome/free-solid-svg-icons';
import { Table, EmployeeStatus, EmployeeClassification, PseudoName, } from '@Components'
import classNames from 'classnames';
import DefaultProperties from 'cleave.js';

function CompanyEmployeesTable({ data, ...props }) {

    const columns = React.useMemo(
        () => [
            {
                Header: 'Pseudo Name',
                id: 'pseudo',
                sortType: 'alphanumeric',
                isSorted: true,
                className: 'text-center',
                headerClassName: 'text-center',
                Cell: ({ row: { original: { pseudo, is_online }}, }) => (<PseudoName pseudo={pseudo} online={is_online} />)
            },
            {
                Header: 'Status',
                id: 'status',
                sortType: 'alphanumeric',
                isSorted: true,
                className: 'text-center',
                headerClassName: 'text-center',
                Cell: ({ row, }) => (<EmployeeStatus status={row.original.status} />)
            },
            {
                Header: 'Base',
                id: 'home-airport',
                sortType: 'alphanumeric',
                isSorted: true,
                className: 'text-center',
                headerClassName: 'text-center',
                Cell: ({ row, }) => (<span>
                    <a href={route('airport.show', { id: row.original.home_airport.id, airportCode: row.original.home_airport.icao})}>
                        {row.original.home_airport.icao}
                    </a>
                </span>)
            },
            {
                Header: 'Cur Airport',
                id: 'current-airport',
                sortType: 'alphanumeric',
                isSorted: true,
                className: 'text-center',
                headerClassName: 'text-center',
                Cell: ({ row, }) => (<span>
                    {(row.original.current_airport)
                        ? (<a href={route('airport.show', { id: row.original.current_airport.id, airportCode: row.original.current_airport.icao})}>
                            {row.original.current_airport.icao}
                        </a>)
                        : (<em className='text-muted'>n/a</em>)
                    }
                </span>)
            },
            {
                Header: 'Flight Hours',
                id: 'flight-hours',
                sortType: 'alphanumeric',
                isSorted: true,
                className: 'text-center',
                headerClassName: 'text-center',
                Cell: ({ row, }) => (<span>
                    {row.original.flight_hours_total_before_hiring}
                </span>)
            },
            {
                Header: 'Punctuality',
                id: 'punctuality',
                sortType: 'alphanumeric',
                isSorted: true,
                className: 'text-center',
                headerClassName: 'text-center',
                Cell: ({ row, }) => (<span>
                    {(row.original.punctuality !== 0 && row.original.comfort !== 0 && row.original.happiness !== 0)
                        ? <ProgressBar now={row.original.punctuality * 100} />
                        : (<em className='text-muted'>n/a</em>)
                    }
                </span>)
            },
            {
                Header: 'Stress Resistance',
                id: 'comfort',
                sortType: 'alphanumeric',
                isSorted: true,
                className: 'text-center',
                headerClassName: 'text-center',
                Cell: ({ row, }) => (<span>
                    {(row.original.punctuality !== 0 && row.original.comfort !== 0 && row.original.happiness !== 0)
                        ? <ProgressBar now={row.original.comfort * 100} />
                        : (<em className='text-muted'>n/a</em>)
                    }
                </span>)
            },
            {
                Header: 'Classifications',
                id: 'classifications',
                sortType: 'alphanumeric',
                isSorted: true,
                className: 'text-center',
                headerClassName: 'text-center',
                Cell: ({ row, }) => {
                    return (row.original.certifications.length <= 3)
                    ? (<span>
                        {row.original.certifications.map((c, k) => {
                            return (row.original.certifications.length <= 3)
                                ? (<EmployeeClassification key={k} classifcation={c.aircraft_class.short_name} />)
                                : null

                        })}
                    </span>)
                    : (<span>
                        {row.original.company.airline &&
                        <a href={route('company.employees.show', { companyCode: row.original.company.airline, id: row.original.id })}>
                            {`view ${row.original.certifications.length} certs`}
                        </a>
                        }
                    </span>)
                }
            },
            {
                Header: '',
                id: 'actions',
                sortType: 'alphanumeric',
                isSorted: true,
                Cell: ({ row, }) => {

                    return (<span>
                        <ButtonGroup>
                            <Button variant='info' href={route('company.employees.show', { companyCode: row.original.company.airline, id: row.original.id })}>
                                <FontAwesomeIcon icon={faInfo} />
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

export default CompanyEmployeesTable
