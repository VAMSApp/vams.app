import React, { useEffect, useState, } from 'react'
import { Inertia } from '@inertiajs/inertia'
import { Button, ButtonGroup, Row, Col, } from 'react-bootstrap'
import Layouts from '@Layouts'
import CompanyForm from './Form'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRedoAlt } from '@fortawesome/free-solid-svg-icons'


function refreshCompanyDetails(id) {
    const url = route('company.refresh', { id: id });
    let response = fetch(url, {
        method: 'POST',
        headers: {
            'X-CSRF-Token': document.head.querySelector("[name~=csrf-token][content]").content
        },
        body: JSON.stringify({
            id: id,
        })
    }).then(response => {
        return response.json()
    }).then(response => {
        console.log(response);
    })

    return response;
}

function ShowPage({ auth, menus, appTitle, pageTitle, company, worlds, errors, ...props}) {
    const initialState = {
        isRefreshing: false,
        data: undefined,
    }

    const [state, setState] = useState(initialState)

    const {
        isRefreshing,
        id,
        data,
    } = state

    const refreshCompany = (e) => {
        e.preventDefault()

        setState({
            ...state,
            isRefreshing: true
        })

        const url = route('company.refresh');
        console.log(url);
        Inertia.post(url, { id: company.id });
        // refreshCompanyDetails(data.id)
        //     .then((response) => {
        //         setState({
        //             ...state,
        //             isRefreshing: false,
        //             data: {
        //                 ...data,
        //                 ...response,
        //             }
        //         })
        //     })
    }

    useEffect(() => {
        setState({
            ...state,
            data: {
                ...company
            }

        })
    }, [company])

    return (
        <Layouts.Authenticated
            auth={auth}
            menus={menus}
            errors={errors}
            appTitle={appTitle}
            pageTitle={pageTitle}
        >
            {data &&
            <CompanyForm
                data={data}
                worlds={worlds}
            />
            }
            <Row>
                <Col>
                    <hr />
                </Col>
            </Row>
            <ButtonGroup>
                <Button href={route('company.index')} variant='secondary' size='lg'>Go Back</Button>
                <Button variant='primary' size='lg' onClick={refreshCompany} disabled={isRefreshing}>
                    {(isRefreshing)
                        ? (<FontAwesomeIcon icon={faRedoAlt} />)
                        : 'Refresh OnAir'
                    }
                </Button>
                <Button href={route('company.edit', { id: company.id })} variant='warning' size='lg'>Edit Company</Button>
            </ButtonGroup>
        </Layouts.Authenticated>
    )
}

export default ShowPage
