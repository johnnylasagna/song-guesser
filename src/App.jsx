import Heading from "./heading/heading";
import Box from "./box/box";
import Socials from "./socials/socials";
import Guesser from "./guesser/guesser";
import { useState } from 'react'

import './App.css'

function App() {
  const [showGuesser, setShowGuesser] = useState(false);

  return (
    <div className="main">
      <Heading text="Song Guessing Game" />
      {!showGuesser && (
        <div>
          <div className="boxes">
            <Box type="youtube" setShowGuesser={setShowGuesser} />
            <Box type="spotify" setShowGuesser={setShowGuesser} />
            <Box type="local" setShowGuesser={setShowGuesser} />
          </div>
          <div className="marquee-container">
            <span className="marquee">Spotify and Local are still under construction</span>
          </div>
        </div>
      )}
      {showGuesser && (
        <div className="boxes">
          <Guesser />
        </div>)}
      <Socials />
    </div>
  )
}

export default App
