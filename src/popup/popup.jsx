import './popup.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPersonDigging } from "@fortawesome/free-solid-svg-icons";

function popup({ setShowPopup, popupType }) {

    switch (popupType) {
        case "guesser":
            return (
                <div className="popup">
                    <div className="popup-close" onClick={() => setShowPopup(false)}>X</div>
                    <span className='popup-heading'>Oops..</span>
                    <FontAwesomeIcon icon={faPersonDigging} size="4x" />
                    <span className='popup-text'>Seems like like you put in an invalid playlist link</span>
                </div>
            );
        case "boxes":
            return (
                <div className="popup">
                    <div className="popup-close" onClick={() => setShowPopup(false)}>X</div>
                    <span className='popup-heading'>Oops..</span>
                    <FontAwesomeIcon icon={faPersonDigging} size="4x" />
                    <span className='popup-text'>Seems like this feature is still under construction</span>
                    <span className='popup-text'>In the meantime, you can check out the other parts that (hopefully) work!</span>
                </div>
            );
        }
    }

    export default popup;