import React from 'react';
import Helmet from 'react-helmet';
import classNames from 'classnames';
import ReactGA from 'react-ga';

export default function Guest({ appTitle, pageTitle, children }) {
    ReactGA.initialize('G-WEBCDCGR6B');

    const title = (pageTitle.length > 0) ? appTitle + ' | ' + pageTitle : appTitle;

    return (<div id='GuestLayout' className={classNames('layout', 'guest-layout')}>
        <Helmet>
            <title>{title}</title>
        </Helmet>
        {children}
    </div>);
}
