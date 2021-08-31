import Layouts from '@Layouts'
import React from 'react'
import { InertiaLink } from '@inertiajs/inertia-react'
import { useForm } from '@inertiajs/inertia-react'
import { Button, } from 'react-bootstrap'

export default function VerifyEmail({ status }) {
    const { post, processing } = useForm()

    const submit = (e) => {
        e.preventDefault()

        post(route('verification.send'))
    }

    return (
        <Layouts.Guest>
            <div className="mb-4 text-sm text-gray-600">
                Thanks for signing up! Before getting started, could you verify your email address by clicking on the
                link we just emailed to you? If you didn't receive the email, we will gladly send you another.
            </div>

            {status === 'verification-link-sent' && (
                <div className="mb-4 font-medium text-sm text-green-600">
                    A new verification link has been sent to the email address you provided during registration.
                </div>
            )}

            <form onSubmit={submit}>
                <div className="mt-4 flex items-center justify-between">
                    <Button processing={processing}>Resend Verification Email</Button>

                    <InertiaLink
                        href={route('logout')}
                        method="post"
                        as="button"
                        className="underline text-sm text-gray-600 hover:text-gray-900"
                    >
                        Log Out
                    </InertiaLink>
                </div>
            </form>
        </Layouts.Guest>
    )
}
