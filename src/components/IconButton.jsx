
import './IconButton.css'
import Icon from './Icon'

function IconButton({Image, Button, Ref}) {
    return (
        <a className="icon-button" href={Ref}>
            <Icon IconName={Image}/><span>{Button}</span>
        </a>
    )
}
export default IconButton;