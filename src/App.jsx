import Heading from "./heading/heading";
import Box from "./box/box";
import Socials from "./socials/socials";
import Guesser from "./guesser/guesser";
import Settings from "./settings/settings";
import { useState } from 'react'

import './App.css'

function App() {
  const [showGuesser, setShowGuesser] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [removeSong, setRemoveSong] = useState(false);

  return (
    <div className="main">
      <Heading text="Song Guessing Game" setShowGuesser={setShowGuesser} />
      {!showGuesser && (
        <div>
          <div className="boxes">
            <Box type="youtube" setShowGuesser={setShowGuesser} />
            <Box type="spotify" setShowGuesser={setShowGuesser} />
            <Box type="apple" setShowGuesser={setShowGuesser} />
          </div>
          <Settings showOptions={showOptions} setShowOptions={setShowOptions} removeSong={removeSong} setRemoveSong={setRemoveSong} />
          <div>
            <div className="marquee-container">
              <span className="marquee">Spotify and Apple are still under construction</span>
            </div>
          </div>
        </div>
      )}
      {showGuesser && (
        <div className="boxes">
          <Guesser showOptions={showOptions} removeSong={removeSong} />
        </div>)}
      <Socials />
    </div>
  )
}

export default App
