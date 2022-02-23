import React, { useState, useEffect, } from 'react'
import { Container, Badge, Row, Col, ButtonGroup, Button, Modal, } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faCheckSquare, faInfo, faInfoCircle, faPencilAlt, faPlane, faPlaneDeparture, faSpellCheck } from '@fortawesome/free-solid-svg-icons';
import { Table, } from '@Components'
import Layouts from '@Layouts'
import UserForm from './Form'

export function ListPage({ auth, menus, errors, appTitle, pageTitle, users, roles, ...props}) {
    const [state, setState] = useState({
        modalIsVisible: false,
    })

    const {
        modalIsVisible,
    } = state

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
                    return (<span>
                        <ButtonGroup>
                            <a href={route('admin.users.show', { id: row.original.id })} className='btn btn-sm btn-info'>
                                <FontAwesomeIcon icon={faInfoCircle} />
                            </a>
                            <a href={route('admin.users.edit', { id: row.original.id })} className='btn btn-sm btn-warning'>
                                <FontAwesomeIcon icon={faPencilAlt} />
                            </a>
                        </ButtonGroup>
                    </span>)
                }
            }
        ]
    );

    const toggleCreateUserModal = () => {
        setState({
            modalIsVisible: !modalIsVisible
        })
    }

    const doCreateUser = (data) => {
        console.log(data);
    }

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
        <Button href={route('admin.users.create')} variant='primary' size='lg'>Add New User</Button>
        </Layouts.Authenticated>
    );
}


export default ListPage
