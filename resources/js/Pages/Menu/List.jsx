import React, { useState, useEffect, } from 'react'
import { Inertia } from '@inertiajs/inertia'
import { Container, Badge, Row, Col, ButtonGroup, Button, Modal, } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faCheckSquare, faInfo, faInfoCircle, faPencilAlt, faPlane, faPlaneDeparture, faRedoAlt, faSpellCheck, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Table, FormattedDate } from '@Components'
import { MenuTable, } from '@Components/Admin/Menu'

import Layouts from '@Layouts'

export function ListPage({ auth, menus, _menus, errors, appTitle, pageTitle, roles, ...props}) {


    return (
        <Layouts.Authenticated
            auth={auth}
            menus={menus}
            errors={errors}
            appTitle={appTitle}
            pageTitle={pageTitle}
        >
            {(_menus && _menus.length > 0) &&
                <MenuTable
                    data={_menus}
                />
            }
            <Button href={route('admin.menu.create')} variant='primary' size='lg'>Add New Menu</Button>

        </Layouts.Authenticated>
    );
}

export default ListPage
