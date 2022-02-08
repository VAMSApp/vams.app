import React from 'react';
import Layouts from '@Layouts';
import { Head } from '@inertiajs/inertia-react';

export default function UserProfile({ auth, menus, errors, appTitle, pageTitle, ...props}) {
    return (
        <Layouts.Authenticated
            auth={auth}
            menus={menus}
            errors={errors}
            appTitle={appTitle}
            pageTitle={pageTitle}
        >
        <p>User profile content here!</p>
        </Layouts.Authenticated>
    );
}
