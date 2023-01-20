import React, { useState, useEffect } from "react";
import Player from "../player/Player";

const AUDIO = document.createElement("audio");

const Audio = ({ song, section }) => {
  const [loaded, setLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [loop, setLoop] = useState(false);
  // const [playBackRate, setPlayBackRate] = useState(1.0);

  function addSrc() {
    let src = song.audioUrl;
    if (section.start) {
      src += `#t=${section.start}`;
    }
    if (section.start & section.end) {
      src += `,${section.end}`;
    }
    AUDIO.src = src;
  }

  async function play() {
    await AUDIO.play();
    setIsPlaying(true);
  }

  function pause() {
    AUDIO.pause();
    setIsPlaying(false);
  }

  function handleSectionEnd(loop) {
    // if section end defined treat it like end of song
    if (AUDIO.currentTime > section.end) {
      addSrc();
      AUDIO.load();
      if (loop) {
        play();
      } else {
        pause();
      }
    }
  }

  async function handleSongEnd(loop) {
    if (loop) {
      AUDIO.load();
      await play();
    } else {
      pause();
      addSrc();
    }
  }

  function removeSongEndEvtListener(loop) {
    if (section.end) {
      AUDIO.removeEventListener("pause", () => handleSectionEnd(loop));
    } else {
      AUDIO.removeEventListener("ended", () => handleSongEnd(loop));
    }
  }

  function setSongEndEvtListener(loop) {
    if (section.end) {
      AUDIO.addEventListener("pause", () => handleSectionEnd(loop));
    } else {
      AUDIO.addEventListener("ended", () => handleSongEnd(loop));
    }
  }

  function load() {
    addSrc();
    AUDIO.load();
    setLoaded(true);
  }

  function changeSpeed(speed) {
    AUDIO.playbackRate = speed;
  }

  function startSong() {
    pause();
    load();
    play();
  }

  function loadPlayPause() {
    if (loaded) {
      playPauseToggle();
    } else {
      startSong();
    }
  }

  function playPauseToggle() {
    if (isPlaying) pause();
    else play();
  }

  const toggleLoop = () => {
    setLoop(!loop);
  };

  useEffect(() => {
    removeSongEndEvtListener(!loop);
    setSongEndEvtListener(loop);
  }, [loop]);

  return (
    <Player
      song={song}
      section={section}
      changeSpeed={changeSpeed}
      startSong={startSong}
      isPlaying={isPlaying}
      loadPlayPause={loadPlayPause}
      loop={loop}
      toggleLoop={toggleLoop}
    />
  );
};

export default Audio;
