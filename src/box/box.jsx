import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faYoutube, faSpotify, faItunes } from "@fortawesome/free-brands-svg-icons";
import { faMusic } from "@fortawesome/free-solid-svg-icons";

import './box.css'

function Box({ type, setShowGuesser, setShowPopup, setPopupType }) {

    let heading = "";
    let icon = ""
    let buttonText = "";
    let underConstruction = false;

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
            underConstruction = true;
            break;
        case "apple":
            heading = "Apple";
            icon = faMusic;
            buttonText = "Upload Apple Music Playlist";
            underConstruction = true;
            break;
        default:
            break;
    }

    return (
        <div className='box'>
            <div className='box-heading'>
                {heading}
            </div>
            <div className='box-button' onClick={() => underConstruction ? (setShowPopup(true), setPopupType("boxes")) : setShowGuesser(true)}>
                <FontAwesomeIcon icon={icon} size="4x"/>
                <span>{buttonText}</span>
            </div>
        </div>
    )

}

export default Box