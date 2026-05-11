import Heading from "./heading/heading";
import Box from "./box/box";
import Socials from "./socials/socials";
import Guesser from "./guesser/guesser";
import Settings from "./settings/settings";
import Popup from "./popup/popup";
import { useState } from 'react'

import './App.css'

function App() {
  const [showGuesser, setShowGuesser] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [removeSong, setRemoveSong] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupType, setPopupType] = useState("");

  return (
    <div className="main">
      <Heading text="Song Guessing Game" setShowGuesser={setShowGuesser} />
      {!showGuesser && (
        <div className="boxes">
          <Box type="youtube" setShowGuesser={setShowGuesser} setShowPopup={setShowPopup} setPopupType={setPopupType} />
          <Box type="spotify" setShowGuesser={setShowGuesser} setShowPopup={setShowPopup} setPopupType={setPopupType} />
          <Box type="apple" setShowGuesser={setShowGuesser} setShowPopup={setShowPopup} setPopupType={setPopupType} />
        </div>
      )}
      {!showGuesser &&
        <Settings showOptions={showOptions} setShowOptions={setShowOptions} removeSong={removeSong} setRemoveSong={setRemoveSong} />}
      {showGuesser && (
        <div className="boxes">
          <Guesser showOptions={showOptions} removeSong={removeSong} setShowPopup={setShowPopup} setPopupType={setPopupType} />
        </div>)}
      {showPopup && <Popup setShowPopup={setShowPopup} popupType={popupType} />}
      <Socials />
    </div>
  )
}

export default App
