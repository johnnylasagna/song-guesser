import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faYoutube, faSpotify, faItunes } from "@fortawesome/free-brands-svg-icons";
import { faMusic } from "@fortawesome/free-solid-svg-icons";

import './box.css'

function Box({ type, setShowGuesser }) {

    let heading = "";
    let icon = ""
    let buttonText = "";

    switch (type) {
        case "youtube":
            heading = "Youtube";
            icon = faYoutube;
            buttonText = "Upload Youtube Playlist";
            break;
        case "spotify":
            heading = "Spotify";
            icon = faSpotify;
            buttonText = "Upload Spotify Playlist";
            break;
        case "apple":
            heading = "Apple";
            icon = faMusic;
            buttonText = "Upload Apple Music Playlist";
            break;
        default:
            break;
    }

    return (
        <div className='box'>
            <div className='box-heading'>
                {heading}
            </div>
            <div className='box-button' onClick={() => setShowGuesser(true)}>
                <FontAwesomeIcon icon={icon} size="4x"/>
                <span>{buttonText}</span>
            </div>
        </div>
    )

}

export default Box