import React from 'react'
import { Container, Badge, Row, Col, ButtonGroup, } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faCheckSquare, faInfo, faInfoCircle, faPencilAlt, faPlane, faPlaneDeparture, faSpellCheck } from '@fortawesome/free-solid-svg-icons';
import { Table, } from '@Components'
import Layouts from '@Layouts'

export function ListPage({ auth, menus, errors, appTitle, pageTitle, users, ...props}) {

    const columns = React.useMemo(
        () => [
            {
                Header: 'Username',
                accessor: 'username',
                sortType: 'alphanumeric',
                isSorted: true,
                className: 'text-center',
            },
            {
                Header: 'Name',
                id: 'name',
                sortType: 'alphanumeric',
                isSorted: true,
                className: 'text-center',
                Cell: ({ row, }) => (<span>
                    {`${row.original.first_name} ${row.original.last_name}`}
                </span>)
            },
            {
                Header: 'Email Addresss',
                accessor: 'email',
                sortType: 'alphanumeric',
                isSorted: true,
                className: 'text-center',
            },
            {
                Header: '',
                id: 'actions',
                sortType: 'alphanumeric',
                isSorted: true,
                className: 'text-center',
                Cell: ({ row, }) => {
                    console.log(row);
                    return (<span>
                        <ButtonGroup>
                            <a href='#' className='btn btn-sm btn-info'>
                                <FontAwesomeIcon icon={faInfoCircle} />
                            </a>
                            <a href="#" className='btn btn-sm btn-warning'>
                                <FontAwesomeIcon icon={faPencilAlt} />
                            </a>
                        </ButtonGroup>
                    </span>)
                }
            }
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
        {users &&
            <Table
                data={users}
                columns={columns}
            />
        }
        </Layouts.Authenticated>
    );
}


export default ListPage
