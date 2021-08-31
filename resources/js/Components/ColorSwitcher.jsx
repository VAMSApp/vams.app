import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoon, faSun, } from '@fortawesome/free-solid-svg-icons';

export default function ColorSwitcher({ isLight }) {
    return (<FontAwesomeIcon icon={(isLight) ? faSun : faMoon}/>);
}
