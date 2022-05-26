import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle, } from '@fortawesome/free-solid-svg-icons'
import classNames from 'classnames'

export function PseudoName ({ pseudo, online, }) {
    const className = classNames('ms-3', { 'is_online': (online), 'text-muted': (!online) })

    return (<span>
        {pseudo}
        &nbsp;
        <FontAwesomeIcon
            icon={faCircle}
            className={className}
        />
    </span>)
}

export default PseudoName

