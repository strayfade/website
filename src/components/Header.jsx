import Icon from '../icons/Icon.svg'
import GitHub from '../icons/GitHub.svg'
import Spotify from '../icons/Spotify.svg'
import Twitter from '../icons/Twitter.svg'
import YouTube from '../icons/YouTube.svg'
import './Header.css'

function Header() {
    return (
        <header>
            <div className='HeaderInner'>
                <a href='/'>
                    <img className='HeaderIcon' src={Icon} alt='Strayfade Logo'></img>
                </a>
                <div className='HeaderSpacing'></div>
                <a href='/' className='HeaderIconDesktopOnly'>
                    <img className='HeaderIcon' src={GitHub} alt='Strayfade Logo'></img>
                </a>
                <a href='/' className='HeaderIconDesktopOnly'>
                    <img className='HeaderIcon' src={Spotify} alt='Strayfade Logo'></img>
                </a>
                <a href='/' className='HeaderIconDesktopOnly'>
                    <img className='HeaderIcon' src={Twitter} alt='Strayfade Logo'></img>
                </a>
                <a href='/' className='HeaderIconDesktopOnly'>
                    <img className='HeaderIcon' src={YouTube} alt='Strayfade Logo'></img>
                </a>
            </div>
        </header>
    )
}
export default Header
