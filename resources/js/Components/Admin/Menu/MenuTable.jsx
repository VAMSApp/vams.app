
import React, { useState, useEffect, } from 'react'
import { Button, ButtonGroup, Badge, Row, Col, } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfo, faPencilAlt, faTrashAlt, } from '@fortawesome/free-solid-svg-icons'
import { Table, } from '@Components'
import { Inertia } from '@inertiajs/inertia'

const initialState = {
    deleteModalVisible: false,
    deleting: null,
}

function MenuTable({ data, }) {
    const [state, setState] = useState(initialState)

    const {
        deleteModalVisible,
        deleting,
    } = state

    const toggleConfirmDeleteModal = (e, deleting) => {
        e.preventDefault()

        setState({
            deleteModalVisible: !deleteModalVisible,
            deleting
        })
    }

    const handleDeleteMenu = (e) => {
        e.preventDefault()
        // handleDelete(deleting)
        // setState(initialState)
    }

    const toggleIsActive = (e, id) => {
        e.preventDefault()
        const url = route('admin.menu.change_active', id);
        Inertia.post(url, id);
    }

    const columns = React.useMemo(
        () => [
            {
                Header: 'Menu Name',
                id: 'name',
                sortType: 'alphanumeric',
                isSorted: true,
                className: 'text-center',
                Cell: ({ row }) => (<a href={route('admin.menu.show', { id: row.original.id })}>
                    {row.original.name}
                </a>)
            },
            {
                Header: 'Status',
                id: 'is_active',
                sortType: 'alphanumeric',
                isSorted: true,
                className: 'text-center',
                Cell: ({ row, }) => (<Badge className='text-cursor-pointer' variant={(row.original.is_active) ? 'success' : 'danger'} onClick={(e) => toggleIsActive(e, row.original.id)}>{(row.original.is_active) ? 'Active' : 'Inactive'}</Badge>)
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
                            <Button href={route('admin.menu.show', { id: row.original.id })} variant='info'>
                                <FontAwesomeIcon icon={faInfo} />
                            </Button>
                            <Button href={route('admin.menu.edit', { id: row.original.id })} variant='warning'>
                                <FontAwesomeIcon icon={faPencilAlt} />
                            </Button>
                            <Button variant='danger' onClick={(e) => toggleConfirmDeleteModal(e, row.original)} disabled={(row.original.menu_items.length > 0)} tooltip={(row.original.menu_items.length > 0) ? 'Delete menu items first' : 'Delete Menu'}>
                                <FontAwesomeIcon icon={faTrashAlt} />
                            </Button>
                        </ButtonGroup>
                    </span>)
                }
            },
        ]
    );

    return (<div id='MenuTable'>
        <Table
            data={data}
            columns={columns}
        />
        {(deleteModalVisible && deleting) &&
            <Modal show={deleteModalVisible} onClick={(e) => toggleConfirmDeleteModal(e)}>
                <Modal.Header>
                    <Modal.Title>Confirm Deletion</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Are you sure that you want to remove '{deleting.name}'?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={(e) => toggleConfirmDeleteModal(e)}>
                        cancel
                    </Button>
                    <Button variant="danger" onClick={(e) => handleDeleteMenu(e)}>
                        Yes, delete {deleting.id}
                    </Button>
                </Modal.Footer>
            </Modal>
        }
    </div>)
}

export default MenuTable
