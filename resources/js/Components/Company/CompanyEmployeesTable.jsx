import React from 'react'
import { Container, Badge, Row, Col, ButtonGroup, Button, Modal, ProgressBar, } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faAnchor, faCheckCircle, faCheckSquare, faInfo, faInfoCircle, faPencilAlt, faCircle, faPlane, faPlaneDeparture, faRedoAlt, faSpellCheck, faDotCircle } from '@fortawesome/free-solid-svg-icons';
import { Table, FormattedDate } from '@Components'
import classNames from 'classnames';

function EmployeeStatus ({ status }) {
    const determineIcon = (s) => {
        let icon;

        switch (s) {
            case 'ready':
                icon = faCheck;
            break;
            default:
                icon = faAnchor;
            break;
        }
        return icon;
    }

    return (<FontAwesomeIcon icon={determineIcon(status)} />)
}

function EmployeeClassification ({ classifcation, }) {
    const determineBadgeColor = (c) => {
        let color;
        switch (c) {
            case 'ULM':
                color = 'success';
            break;
            case 'SEPL':
                color = 'info';
            break;
            case 'SEPS':
                color = 'info';
            break;
            case 'MEPL':
                color = 'info';
            break;
            case 'SETL':
                color = 'warning';
            break;
            case 'SETS':
                color = 'warning';
            break;
            case 'METL':
                color = 'warning';
            break;
            case 'METS':
                color = 'warning';
            break;
            case 'HELO':
                color = 'danger';
            break;
            case 'GLD':
                color = 'success';
            break;
            case 'MEPS':
                color = 'info';
            break;
            case 'JET':
                color = 'purple';
            break;
            default:
                color ='secondary';
            break;
        }

        return color;
    }

    return (<Badge className='mx-1' variant={determineBadgeColor(classifcation)}>
        {classifcation}
    </Badge>);
}

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
                Cell: ({ row, }) => (<span>
                    {row.original.pseudo}
                    &nbsp;
                    <FontAwesomeIcon icon={faCircle} className={classNames('ms-3', { 'is_online': (row.original.is_online), 'text-muted': (!row.original.is_online) })} />
                </span>)
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
                    {row.original.home_airport.icao}
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
                    {row.original.current_airport.icao}
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
                    <ProgressBar now={row.original.punctuality * 100} />
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
                    <ProgressBar now={row.original.comfort * 100} />
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
                    return (<span>
                        {row.original.certifications.map((c, k) => (
                            <EmployeeClassification key={k} classifcation={c.aircraft_class.short_name} />
                        ))}
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
