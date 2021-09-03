import React, { useState, useEffect, } from 'react'
import { useForm } from '@inertiajs/inertia-react';
import { Modal, Badge, Row, Col, Form, FormControl, ButtonGroup, Button, } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faCheckSquare, faInfo, faInfoCircle, faPencilAlt, faPlane, faPlaneDeparture, faSpellCheck, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Table, } from '@Components'
import Layouts from '@Layouts'
import { Input, Checkbox, ValidationErrors, } from '@Components/Form'

async function callRemoveRoleFromUser (roleId, userId) {
    let response = await fetch(route('users.remove_role', { id: userId }), {
        method: 'PATCH',
        body: JSON.stringify({
            userId,
            roleId,
        }),
        headers: {
            'Content-Type': 'application/json',
            'X-CSRF-Token': document.head.querySelector("[name~=csrf-token][content]").content
        }
    });

    let json = response.json()

    console.log(json)
}

function EdiPage({ auth, menus, appTitle, pageTitle, user, roles, ...props}) {
    const initialState = {
        confirmDeleteModalVisible: false,
        userId: undefined,
        role: undefined,
    };

    const [state, setState] = useState(initialState)

    const {
        confirmDeleteModalVisible,
        userId,
        role,
     } = state

    const toggleDeleteModal = () => {
        setState({
            ...state,
            confirmDeleteModalVisible: !confirmDeleteModalVisible,
        })
    }

    const openDeleteModal = (userId, role) => {
        setState({
            ...state,
            confirmDeleteModalVisible: true,
            userId: userId,
            role: role,
        })
    }

    const { data, setData, isDirty, hasErrors, post, processing, errors, reset, ...rest } = useForm({
        first_name: (user) ? user.first_name : '',
        last_name: (user) ? user.last_name : '',
        username: (user) ? user.username : '',
        email: (user) ? user.email : '',
        role: (user) ? user.roles : '',
        password: '',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const onHandleChange = (event) => {
        const {
            name,
            type,
            checked,
            value,
        } = event.target;

        setData(name, (type === 'checkbox') ? checked : value);
    };

    const doSubmit = () => {
        onSubmit()
    }

    const removeRoleFromUser = (userId, role) => {
        callRemoveRoleFromUser(userId, role.id)
    }

    const cancelRoleRemove = () => {
        setState(initialState)
    }

    return (
        <Layouts.Authenticated
            auth={auth}
            menus={menus}
            errors={errors}
            appTitle={appTitle}
            pageTitle={pageTitle}
        >
        {user &&
        <Form onSubmit={doSubmit}>
            <ValidationErrors errors={errors} />
            <Form.Group as={Row}>
                <Col>
                    <Form.Label htmlFor="first_name">First Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="first_name"
                        value={data.first_name}
                        autoComplete="first_name"
                        placeholder="First Name"
                        required
                        onChange={onHandleChange}
                    />
                    {errors && errors.first_name &&
                        <FormControl.Feedback type='invalid'>{errors.first_name}</FormControl.Feedback>
                    }
                </Col>
                <Col>
                    <Form.Label htmlFor="last_name">Last Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="last_name"
                        value={data.last_name}
                        autoComplete="last_name"
                        placeholder="Last Name"
                        required
                        onChange={onHandleChange}
                    />
                    {errors && errors.last_name &&
                        <FormControl.Feedback type='invalid'>{errors.last_name}</FormControl.Feedback>
                    }
                </Col>
            </Form.Group>
            <Form.Group as={Row}>
                <Col>
                    <Form.Label htmlFor="username">Username</Form.Label>
                    <Form.Control
                        type="text"
                        name="username"
                        value={data.username}
                        autoComplete="username"
                        placeholder="Username"
                        required
                        onChange={onHandleChange}
                    />
                    {errors && errors.username &&
                        <FormControl.Feedback type='invalid'>{errors.username}</FormControl.Feedback>
                    }
                </Col>
            </Form.Group>
            <Form.Group as={Row}>
                <Col>
                    <Form.Label htmlFor="email">Email Address</Form.Label>
                    <Form.Control
                        type="email"
                        name="email"
                        value={data.email}
                        autoComplete="email"
                        placeholder="email Address"
                        required
                        onChange={onHandleChange}
                    />
                    {errors && errors.email &&
                        <FormControl.Feedback type='invalid'>{errors.email}</FormControl.Feedback>
                    }
                </Col>
            </Form.Group>
            <Form.Group>
                <Form.Label>Roles</Form.Label>
                <table className='table table-striped'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Role</th>
                            <th/>
                        </tr>
                    </thead>
                    <tbody>
                        {roles.map((r, k) => (<tr key={k}>
                            <td>{r.id}</td>
                            <td>{r.name}</td>
                            <td>
                                <Button size='sm' variant='danger' onClick={(e) => openDeleteModal(user.id, r)}>
                                    <FontAwesomeIcon icon={faTrash} />
                                </Button>
                            </td>
                        </tr>))}
                    </tbody>
                </table>

            </Form.Group>
            <Row>
                <Col>
                    <hr />
                </Col>
            </Row>
            <div className="d-grid gap-2">
                <ButtonGroup>
                    <Button type='submit' variant='success' size='md' disabled={(processing || (isDirty && hasErrors))}>Save Changes</Button>
                    <Button href={route('users.show', { id: user.id })} size='md' variant='secondary'>Cancel</Button>
                </ButtonGroup>
            </div>
        </Form>
        }
        <Modal show={confirmDeleteModalVisible} onHide={toggleDeleteModal}>
            <Modal.Header>
                <Modal.Title>Confirm role removal</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Are you sure you that you want to remove the {(role) ? role.name : ''} role from this user?</p>
            </Modal.Body>
            <Modal.Footer>
                <ButtonGroup>
                    <Button variant='danger' size='md' onClick={removeRoleFromUser}>Yes, Remove Role</Button>
                    <Button variant='secondary' size='md' onClick={cancelRoleRemove}>No</Button>
                </ButtonGroup>
            </Modal.Footer>
        </Modal>
        </Layouts.Authenticated>
    );
}

export default EdiPage
