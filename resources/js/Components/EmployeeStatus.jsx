import { Container, Badge, Row, Col, ButtonGroup, Button, Modal, ProgressBar, OverlayTrigger, Tooltip, } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faPlane, faAnchor, faCheckCircle, faCheckSquare, faInfo, faInfoCircle, faPencilAlt, faCircle, faPlaneDeparture, faRedoAlt, faSpellCheck, faDotCircle, faMoon } from '@fortawesome/free-solid-svg-icons';

function EmployeeStatus (props) {
    const {
        status: {
            name,
            slug,
        }
    } = props

    const determineStatus = (slug) => {
        switch (slug) {
            case 'ready':
            case 'idle':
                return (<FontAwesomeIcon icon={faCheck} className='text-success' />)
            case 'flying':
                return (<FontAwesomeIcon icon={faPlane} className='text-info' />)
            case 'resting':
                return (<FontAwesomeIcon icon={faMoon} className='text-text-muted' />)
            default:
                return (<FontAwesomeIcon icon={faAnchor} />)
            break;
        }
    }

    return (<OverlayTrigger
        key={'left'}
        placement={'left'}
        overlay={<Tooltip id={`id-left`} placement='left'>
            {name}
        </Tooltip>}
    >
        {determineStatus(slug)}
    </OverlayTrigger>)
}

export default EmployeeStatus
