import { Container, Badge, Row, Col, ButtonGroup, Button, Modal, ProgressBar, OverlayTrigger, Tooltip, } from 'react-bootstrap'

export function EmployeeClassification ({ classifcation, }) {
    const determineBadgeColor = (c) => {
        let color;
        switch (c) {
            case 'ULM':
                color = 'success';
            break;
            case 'SEPL':
                color = 'info';
            break;
            case 'SEPS':
                color = 'info';
            break;
            case 'MEPL':
                color = 'info';
            break;
            case 'SETL':
                color = 'warning';
            break;
            case 'SETS':
                color = 'warning';
            break;
            case 'METL':
                color = 'warning';
            break;
            case 'METS':
                color = 'warning';
            break;
            case 'HELO':
                color = 'danger';
            break;
            case 'GLD':
                color = 'success';
            break;
            case 'MEPS':
                color = 'info';
            break;
            case 'JET':
                color = 'purple';
            break;
            default:
                color ='secondary';
            break;
        }

        return color;
    }

    return (<Badge className='mx-1' variant={determineBadgeColor(classifcation)}>
        {classifcation}
    </Badge>);
}

export default EmployeeClassification
