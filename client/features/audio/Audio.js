import React, { useState, useEffect } from "react";
import Player from "../player/Player";

const AUDIO = document.createElement("audio");

const next = () => {};

const Audio = () => {
  const [currentSong, setCurrentSong] = useState({});
  const [isPlaying, setIsPlaying] = useState(false);

  function play() {
    AUDIO.play();
    setIsPlaying(true);
  }

  function pause() {
    AUDIO.pause();
    setIsPlaying(false);
  }

  function load(currentSong) {
    AUDIO.src = currentSong.audioUrl;
    AUDIO.load();

    setCurrentSong(currentSong);
  }

  function startSong(song) {
    pause();
    load(song);
    play();
  }

  function toggleOne(selectedSong) {
    if (selectedSong.id !== currentSong.id) {
      startSong(selectedSong);
    } else {
      toggle();
    }
  }

  function toggle() {
    if (isPlaying) pause();
    else play();
  }

  return (
    <Player
      startSong={startSong}
      isPlaying={isPlaying}
      toggleOne={toggleOne}
      toggle={toggle}
    />
  );
};

export default Audio;
