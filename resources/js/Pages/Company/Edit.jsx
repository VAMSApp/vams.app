import React, { useState, } from 'react'
import { Inertia } from '@inertiajs/inertia'
import { Modal, Badge, Row, Col, Form, FormControl, ButtonGroup, Button, } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faCheckSquare, faInfo, faInfoCircle, faPencilAlt, faPlane, faPlaneDeparture, faSpellCheck, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Table, } from '@Components'
import Layouts from '@Layouts'
import { Input, Checkbox, ValidationErrors, } from '@Components/Form'
import CompanyForm from './Form'

function EditPage({ auth, menus, appTitle, pageTitle, company, worlds, errors, ...props}) {

    const doSubmit = ({ uuid, apiKey, worldId }) => {
        const values = {
            uuid: uuid,
            api_key: apiKey,
            world_id: worldId,
        };

        Inertia.post(route('company.edit', values))
    }

    const doCancel = (e) => {
        console.log('doCancel()');
    }

    return (
        <Layouts.Authenticated
            auth={auth}
            menus={menus}
            errors={errors}
            appTitle={appTitle}
            pageTitle={pageTitle}
        >
            <CompanyForm data={company} worlds={worlds} doSubmit={doSubmit} doCancel={doCancel} cancelHref={route('company.show', { id: company.id })} />
        </Layouts.Authenticated>
    )
}

export default EditPage
