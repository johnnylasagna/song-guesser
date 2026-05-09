import './socials.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faYoutube, faGithub, faLinkedin, faInstagram, faTwitter } from "@fortawesome/free-brands-svg-icons";

function Socials() {
    return (
        <div className="socials">
            Find me here:
            <a href="https://www.youtube.com/@johnnylasagna7990" target="_blank" rel="noopener noreferrer" className='social-link'>
                <FontAwesomeIcon icon={faYoutube} size="2x" />
            </a>
            <a href="https://github.com/johnnylasagna" target="_blank" rel="noopener noreferrer" className='social-link'>
                <FontAwesomeIcon icon={faGithub} size="2x" />
            </a>
            <a href="https://www.linkedin.com/in/nishchay-singh-2965ab328/" target="_blank" rel="noopener noreferrer" className='social-link'    >
                <FontAwesomeIcon icon={faLinkedin} size="2x" />
            </a>
            <a href="https://www.instagram.com/johnnylasagna2212/" target="_blank" rel="noopener noreferrer" className='social-link'>
                <FontAwesomeIcon icon={faInstagram} size="2x" />
            </a>
            <a href="https://x.com/Nishchay22pro" target="_blank" rel="noopener noreferrer" className='social-link'>
                <FontAwesomeIcon icon={faTwitter} size="2x" />
            </a>
        </div>
    )
}

export default Socials