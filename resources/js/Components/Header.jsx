import React, { useState, useEffect } from 'react'
import { Inertia } from '@inertiajs/inertia'
import {
    Navbar,
    Nav,
    NavDropdown,
    Container,
} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCogs, } from '@fortawesome/free-solid-svg-icons'
import { Logo, ColorSwitcher, Navigation, } from '@Components'
import './headerStyle.scss'

const Menu = [
    {
        routeName: 'home',
        label: 'Home',
        href: '/home'
    }
]

export default function Header({ id, auth, menus: { mainMenu, adminMenu, }, logoText, isAdmin, currentRoute }) {
    const initialState = {
        isLight: false,
    }

    const savedState = JSON.parse(localStorage.getItem('state'))
    const [state, setState] = useState(savedState || initialState)

    const changeColor = () => {
        const {
            isLight,
            navIsOpen,
        } = state

        const newState = Object.assign({}, state, {
            isLight: !isLight,
        })

        setState(newState)
    }

    const {
        isLight,
        navIsOpen,
    } = state

    const doLogout = () => {
        Inertia.post(route('logout'))
    }

    useEffect(() => {
        localStorage.setItem('state',  JSON.stringify(state))
    }, [state])

    const mode = (isLight) ? 'Light' : 'Dark'

    return (<header id={id}>
        <Navbar bg={(isLight) ? 'light' : 'dark'} variant={(isLight) ? 'light' : 'dark'} expand="lg">
            <Navbar.Brand>
                <Logo light={isLight} height={40} />
                {(logoText) &&
                    <span className='logoText'>{` ${logoText}`}</span>
                }
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    {mainMenu && mainMenu.length > 0 &&
                        mainMenu.map((v, k) => (<Nav.Link key={k} href={route(v.route_name)} active={route().current(v.route_name)}>
                            {v.label}
                        </Nav.Link>))
                    }
                </Nav>
                <Nav>
                    {(auth && auth.user) &&
                        <NavDropdown title={`Hi ${auth.user.username}`} id="basic-nav-dropdown">
                            {/* <NavDropdown.Item href={route('profile')}>My Profile</NavDropdown.Item> */}
                            <NavDropdown.Divider />
                            <NavDropdown.Item onClick={doLogout}>Logout</NavDropdown.Item>
                        </NavDropdown>
                    }
                    { (!auth) &&
                    <>
                        <Nav.Link href={route('login')}>Login</Nav.Link>
                        <Nav.Link href={route('register')}>Register</Nav.Link>
                    </>
                    }
                    <Nav.Link onClick={changeColor} alt={`Switch to ${mode} mode`}>
                        <ColorSwitcher isLight={!isLight} />
                    </Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    </header>)
}

Header.propTypes = {}
