import React from 'react'
import { Nav, NavItem, NavLink, }from 'react-bootstrap';

export default function Navigation({ className, menu, auth }) {


    return (<Nav className={className || 'mr-auto'}>
        {menu.map((m, k) => (<NavItem key={k} active={route().current(m.name)}>
            <NavLink href={m.href} active={route().current(m.name)}>{m.label}</NavLink>
        </NavItem>))}
    </Nav>)
}
