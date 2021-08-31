import React, { useEffect } from 'react'
import { useForm } from '@inertiajs/inertia-react'
import { Button, Label, } from 'react-bootstrap'
import Layouts from '@Layouts'
import { Form, } from '@Components'

export default function ConfirmPassword() {
    const { data, setData, post, processing, errors, reset } = useForm({
        password: '',
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();

        post(route('password.confirm'));
    };

    return (
        <Layouts.Guest>
            <Container>
                <Row>
                    <Col>
                        <p className="text-muted">This is a secure area of the application. Please confirm your password before continuing.</p>
                    </Col>
                </Row>

                <form onSubmit={submit}>
                    <div className="mt-4">
                        <Form.Input
                            type="password"
                            name="password"
                            label="Password"
                            value={data.password}
                            className="mt-1 block w-full"
                            isFocused={true}
                        />
                    </div>

                    <div className="flex items-center justify-end mt-4">
                        <Button className="ml-4" processing={processing}>
                            Confirm
                        </Button>
                    </div>
                </form>
            </Container>
        </Layouts.Guest>
    );
}
