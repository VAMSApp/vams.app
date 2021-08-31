import React from 'react'
import { Logo, } from '@Components'
import classNames from 'classnames'

export const AuthLogo = ({ logoText, height, light, inline }) => (
    <div className='logoContainer'>
        <div className={classNames('logo', {'inline': (inline) ? inline : false })}>
            <Logo height={height} light={light} />
        </div>
        {logoText &&
        <div className={classNames('logoText', {'inline': (inline) ? inline : false })}>
            <h1 className='h2'>{logoText}</h1>
        </div>
        }
    </div>
)


export default AuthLogo
