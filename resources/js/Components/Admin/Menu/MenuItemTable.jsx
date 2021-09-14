
import React, { useState, useEffect, } from 'react'
import { Button, ButtonGroup, Form, Badge, Row, Col, Modal, } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfo, faPencilAlt, faTrashAlt, } from '@fortawesome/free-solid-svg-icons'
import { Table, } from '@Components'
import Api from '@/Middleware/Api'
import { Inertia } from '@inertiajs/inertia'

const initialState = {
    deleteModalVisible: false,
    deleting: null,
    isEditing: false,
    editing: null,
    _data: null,
}

function MenuItemTable({ data, handleDelete, }) {
    const [state, setState] = useState(initialState)

    const {
        deleteModalVisible,
        deleting,
    } = state

    const toggleConfirmDeleteModal = (e, deleting) => {
        e.preventDefault()

        setState({
            ...state,
            deleteModalVisible: !deleteModalVisible,
            deleting
        })
    }

    const handleDeleteMenu = (e) => {
        e.preventDefault()
        handleDelete(deleting)
        setState(initialState)
    }

    const toggleIsActive = (e, id) => {
        e.preventDefault();
        const url = route('admin.menu_item.change_active', id);
        Inertia.post(url, id);
    }

    const columns = React.useMemo(
        () => [
            {
                Header: 'Label',
                accessor: 'label',
                sortType: 'alphanumeric',
                isSorted: true,
                className: 'text-center',
            },
            {
                Header: 'Route Name',
                accessor: 'route_name',
                sortType: 'alphanumeric',
                isSorted: true,
                className: 'text-center',
            },
            {
                Header: 'Permission Name',
                accessor: 'permission_name',
                sortType: 'alphanumeric',
                isSorted: true,
                className: 'text-center',
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
                Cell: ({ row, }) => (<Button variant='danger' onClick={(e) => toggleConfirmDeleteModal(e, row.original)} disabled={(row.original.route_name.includes('admin.'))}>
                    <FontAwesomeIcon icon={faTrashAlt} />
                </Button>)
            },
        ]
    );

    return (<div id='MenuTable'>
        <Row>
            <Col>
                <h3>Menu Items</h3>
            </Col>
        </Row>
        <Row>
            <Col>
                <Table
                    data={data}
                    columns={columns}
                />
            </Col>
        </Row>
        {handleDelete && (deleteModalVisible && deleting) &&
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

export default MenuItemTable
