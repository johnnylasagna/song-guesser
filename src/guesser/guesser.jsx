import { useState, useRef } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlay, faVolumeHigh } from "@fortawesome/free-solid-svg-icons";
import YouTube from 'react-youtube';

import './guesser.css'

function Guesser({ type }) {

    const coverRef = useRef(null);

    const [playlistId, setPlaylistId] = useState("");
    const [oldPlaylistId, setOldPlaylistId] = useState("");
    const [playlistData, setPlaylistData] = useState([]);
    const [guessPlaylistData, setGuessPlaylistData] = useState([]);
    const [guessIndex, setGuessIndex] = useState(0);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [score, setScore] = useState(0);
    const [attempts, setAttempts] = useState(0);

    const generateGuesses = async (data) => {
        setSelectedIndex(null);
        if (data.length === 0) return;
        const shuffled = [...data].sort(() => 0.5 - Math.random());
        const max = Math.min(4, data.length);
        const min = 0;
        const guessIndex = Math.floor(Math.random() * (max - min)) + min;
        const selected = shuffled.slice(0, max);
        setGuessIndex(guessIndex);
        setGuessPlaylistData(selected);
    }

    const getPlaylistData = async () => {
        if (!playlistId) return;
        if (playlistId === oldPlaylistId) { await generateGuesses(playlistData); return; }
        setOldPlaylistId(playlistId);
        try {
            const res = await fetch(
                `/api/playlist?playlistId=${playlistId}`
            );
            const videos = await res.json();
            setPlaylistData(videos);
            console.log("Fetched playlist data:", videos);
            await generateGuesses(videos);
        } catch (error) {
            console.error("Error fetching playlist data:", error);
        }
    };

    const onReady = (event) => {
        const player = event.target;

        const interval = setInterval(() => {
            const duration = player.getDuration();

            if (duration > 0) {
                clearInterval(interval);
                const randomTime =
                    Math.floor(Math.random() * (duration - 20)) + 10;

                player.seekTo(randomTime, true);

                const seekCheck = setInterval(() => {
                    const current = player.getCurrentTime();

                    if (current > 1) {
                        clearInterval(seekCheck);
                        player.playVideo();

                        const playCheck = setInterval(() => {
                            const state = player.getPlayerState();

                            if (state === 1) {
                                clearInterval(playCheck);
                                coverRef.current.style.fontSize = "100px";

                                setTimeout(() => {
                                    player.pauseVideo();
                                    coverRef.current.style.fontSize = "50px";
                                }, 5000);
                            }

                        }, 100);
                    }
                }, 100);
            }
        }, 100);
    }

    return (
        <div className="guesser">
            <div className='guesser-player'>
                <span className='guesser-cover'>
                    <FontAwesomeIcon icon={faVolumeHigh} ref={coverRef} className='guess-volume-icon' />
                </span>
                <div className='guesser-link'>
                    <input type="text" className="guesser-input" placeholder="Enter playlist link" value={playlistId} onChange={(e) => setPlaylistId(e.target.value)}></input>
                    <button className="guesser-button" onClick={() => { getPlaylistData(); }}>
                        <FontAwesomeIcon icon={faCirclePlay} />
                    </button>
                </div>
            </div>
            {(playlistData.length !== 0) && (
                <div className='guesser-list'>
                    <div className='guesser-list-heading'>
                        <span>Guess the Song!</span>
                        <span>Score: {score} / {attempts}</span>
                    </div>
                    <div className='guesser-list-songs'>
                        {guessPlaylistData.map((video, index) => (
                            <div key={index} className={`guesser-list-song ${selectedIndex === index
                                ? index === guessIndex
                                    ? "correct"
                                    : "wrong"
                                : ""
                                }`}
                                onClick={() => {
                                    setSelectedIndex(index);
                                    setAttempts(attempts + 1);
                                    if (index === guessIndex) {
                                        setTimeout(() => {
                                            setScore(score + 1);
                                            generateGuesses(playlistData);
                                        }, 1500);
                                    }
                                }}
                            >
                                <div className='guesser-list-thumbnail'>
                                    <img src={video.thumbnail} alt="song thumbnail"></img>
                                </div>
                                <span className='guesser-list-title'>{video.title}</span>
                            </div>
                        ))}
                    </div>
                </div>)
            }
            <YouTube videoId={guessPlaylistData[guessIndex]?.videoId} opts={{ playerVars: { autoplay: 1, controls: 0, start: 10 } }} onReady={onReady} style={{ display: 'none' }} />
        </div >
    )
}

export default Guesser