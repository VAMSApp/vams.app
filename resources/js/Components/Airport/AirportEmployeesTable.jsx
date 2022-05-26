import React from 'react'
import { Container, Badge, Row, Col, ButtonGroup, Button, Modal, ProgressBar, OverlayTrigger, Tooltip, } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faPlane, faAnchor, faCheckCircle, faCheckSquare, faInfo, faInfoCircle, faPencilAlt, faCircle, faPlaneDeparture, faRedoAlt, faSpellCheck, faDotCircle, faMoon } from '@fortawesome/free-solid-svg-icons';
import { Table, FormattedDate, PseudoName, EmployeeStatus, EmployeeClassification, } from '@Components'
import classNames from 'classnames';


function AirportEmployeesTable({ current_airport, data, ...props }) {

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
                Header: 'Cur Airport',
                id: 'current_airport',
                sortType: 'alphanumeric',
                isSorted: true,
                className: 'text-center',
                headerClassName: 'text-center',
                Cell: ({ row, }) => (current_airport.icao === row.original.current_airport.icao)
                    ? (<span className='text-muted'>
                        {row.original.current_airport.icao}
                    </span>)
                    : (<a href={route('airport.show', { id: row.original.current_airport.id, airportCode: row.original.current_airport.icao})}>
                        {row.original.current_airport.icao}
                    </a>)
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
                        ? (<OverlayTrigger
                            key='left-punctuality'
                            placement='left'
                            overlay={<Tooltip id={`${row.original.id}-punctuality-left`} placement='left'>
                                <span>
                                    {`${row.original.punctuality * 100}%`}
                                </span>
                            </Tooltip>}
                        >
                            <ProgressBar now={row.original.punctuality * 100} />
                        </OverlayTrigger>)
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
                        ? (<OverlayTrigger
                            key='left-comfort'
                            placement='left'
                            overlay={<Tooltip id={`${row.original.id}-comfort-left`} placement='left'>
                                <span>
                                    {`${row.original.comfort * 100}%`}
                                </span>
                            </Tooltip>}
                        >
                            <ProgressBar now={row.original.comfort * 100} />
                        </OverlayTrigger>)
                        : (<em className='text-muted'>n/a</em>)
                    }
                </span>)
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

export default AirportEmployeesTable
