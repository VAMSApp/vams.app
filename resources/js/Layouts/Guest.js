import React from 'react';
import Helmet from 'react-helmet';
import classNames from 'classnames';

export default function Guest({ appTitle, pageTitle, children }) {
    const title = (pageTitle.length > 0) ? appTitle + ' | ' + pageTitle : appTitle;

    return (<div id='GuestLayout' className={classNames('layout', 'guest-layout')}>
        <Helmet>
            <title>{title}</title>
        </Helmet>
        {children}
    </div>);
}
