import React, { useEffect, useState, } from 'react'
import { Inertia } from '@inertiajs/inertia'
import { usePage } from '@inertiajs/inertia-react'
import { Button, ButtonGroup, Row, Col, Form, Modal, FormControl } from 'react-bootstrap'
import Layouts from '@Layouts'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRedoAlt } from '@fortawesome/free-solid-svg-icons'
import { MenuTable, MenuItemTable, AddMenuItemForm, } from '@Components/Admin/Menu'
import classNames from 'classnames'

const initialState = {
    addModalVisible: false,
}

function ShowPage({ auth, menus, appTitle, pageTitle, menu, worlds, ...props}) {
    const [state, setState] = useState(initialState);
    const { errors } = usePage().props

    const {
        addModalVisible,
    } = state

    const changeMenuStatus = (e) => {
        e.preventDefault()
        const url = route('admin.menu.change_active', { id: menu.id });
        const id = menu.id

        Inertia.post(url, id);
    }

    const toggleAddItemModal = (e) => {
        e.preventDefault()
        setState({
            addModalVisible: !addModalVisible,
        });
    }

    const addMenuItem = (values) => {
        const url = route('admin.menu.create_menu_item', {
            id: menu.id
        })

        values = {
            ...values,
            menu_id: menu.id,
        }

        console.log(values)
        Inertia.post(url, values)
    }

    const deleteMenuItem = (values) => {
        const url = route('admin.menu.delete_menu_item', {
            id: menu.id,
            menuItemId: values.id,
        });

        values = {
            ...values,
            menu_item_id: values.id,
        }

        Inertia.delete(url)
    }

    const isAdminMenu = (menu.slug === 'admin-menu');

    return (
        <Layouts.Authenticated
            auth={auth}
            menus={menus}
            errors={errors}
            appTitle={appTitle}
            pageTitle={pageTitle}
        >
            <Form>
                <Row>
                    <Col lg={4}>
                        <Form.Group>
                            <Form.Label><strong>Menu Name</strong></Form.Label>
                            <Form.Control
                                name='name'
                                id='name'
                                placeholder='Manage Users'
                                onChange={(e) => handleFieldChange(e)}
                                value={menu.name}
                                plaintext
                                disabled
                            />
                        </Form.Group>
                    </Col>
                    <Col lg={3}>
                        <Form.Group>
                            <Form.Label><strong>Menu Slug</strong></Form.Label>
                            <Form.Control
                                name='slug'
                                id='slug'
                                value={menu.slug}
                                plaintext
                                disabled
                            />
                        </Form.Group>

                    </Col>
                    <Col lg={{
                        span: 1,
                        offset: 1
                    }}>
                        <Form.Group>
                            <Form.Label><strong>Is Active?</strong></Form.Label>
                            <Button
                                block
                                variant={classNames({'success': (menu.is_active), 'secondary': (!menu.is_active) })}
                                active={menu.is_active}
                                onClick={(e) => changeMenuStatus(e)}
                                disabled={isAdminMenu}
                            >
                                {(menu.is_active) ? 'Yes' : 'No'}
                            </Button>
                        </Form.Group>
                    </Col>
                    <Col lg={{
                        span: 1,
                        offset: 1
                    }}>
                        <Form.Group>
                            <Form.Label><strong>Last Changed</strong></Form.Label>
                            <Form.Control
                                name='updated_at'
                                id='updated_at'
                                onChange={(e) => handleFieldChange(e)}
                                value={menu.human_updated_at}
                                plaintext
                                disabled
                            />
                        </Form.Group>
                    </Col>
                    <Col lg={1}>
                        <Form.Group>
                            <Form.Label><strong>Created At</strong></Form.Label>
                            <Form.Control
                                name='created_at'
                                id='created_at'
                                onChange={(e) => handleFieldChange(e)}
                                value={menu.human_created_at}
                                plaintext
                                disabled
                            />
                        </Form.Group>
                    </Col>
                </Row>
            </Form>
            {menu &&
            <MenuItemTable
                data={menu.menu_items}
                handleDelete={deleteMenuItem}
            />
            }
            <Row>
                <Col>
                    <hr />
                </Col>
            </Row>
            <ButtonGroup>
                <Button href={route('admin.menu.index')} variant='secondary' size='lg'>Go Back</Button>
                <Button variant='primary' size='lg' onClick={(e) => toggleAddItemModal(e)}>Add Menu Item</Button>
            </ButtonGroup>

            <Modal show={addModalVisible} onHide={toggleAddItemModal}>
                <Modal.Header>
                    <Modal.Title>Add Menu Item</Modal.Title>
                </Modal.Header>
                <AddMenuItemForm submit={addMenuItem} cancel={toggleAddItemModal} modal />
            </Modal>
        </Layouts.Authenticated>
    )
}

export default ShowPage
