import React from 'react'
import { Form, Button, } from 'react-bootstrap'
import Layouts from '@Layouts'
import {  Inout, ValidationErrors, } from '@Components/Form'
import { useForm } from '@inertiajs/inertia-react'

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    })

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.value)
    }

    const submit = (e) => {
        e.preventDefault()

        post(route('password.email'))
    }

    return (
        <Layouts.Guest>
            <div className="mb-4 text-sm text-gray-500 leading-normal">
                Forgot your password? No problem. Just let us know your email address and we will email you a password
                reset link that will allow you to choose a new one.
            </div>

            {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}

            <ValidationErrors errors={errors} />

            <Form onSubmit={submit}>
                <Form.Control
                    type="text"
                    name="email"
                    value={data.email}
                    className="mt-1 block w-full"
                    isFocused={true}
                />

                <div className="flex items-center justify-end mt-4">
                    <Button className="ml-4" processing={processing}>
                        Email Password Reset Link
                    </Button>
                </div>
            </Form>
        </Layouts.Guest>
    )
}
