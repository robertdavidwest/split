import React, { useState, useEffect } from "react";
import Player from "../player/Player";

const AUDIO = document.createElement("audio");

const Audio = ({ song, section }) => {
  const [currentSong, setCurrentSong] = useState({});
  const [isPlaying, setIsPlaying] = useState(false);
  const [loop, setLoop] = useState(false);
  // const [playBackRate, setPlayBackRate] = useState(1.0);

  function addSrc(song, section) {
    let src = song.audioUrl;
    if (section.start) {
      src += `#t=${section.start}`;
    }
    if (section.start & section.end) {
      src += `,${section.end}`;
    }
    AUDIO.src = src;
  }

  function play() {
    AUDIO.play();
    setIsPlaying(true);
  }

  function pause() {
    AUDIO.pause();
    setIsPlaying(false);
  }

  function handleSectionEnd() {
    // if section end defined treat it like end of song
    if (AUDIO.currentTime > section.end) {
      addSrc(song, section);
      AUDIO.load();
      if (loop) {
        play();
      } else {
        pause();
      }
    }
  }

  function handleSongEnd() {
    if (loop) {
      AUDIO.load();
      play();
    } else {
      pause();
      addSrc(song, section);
    }
  }

  function setSongEndEvtListeners() {
    if (section.end) {
      AUDIO.addEventListener("pause", handleSectionEnd);
    } else {
      AUDIO.addEventListener("ended", handleSongEnd);
    }
  }

  function load(currentSong) {
    addSrc(song, section);
    AUDIO.load();
    setSongEndEvtListeners();
    setCurrentSong(currentSong);
  }

  function changeSpeed(speed) {
    AUDIO.playbackRate = speed;
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

  useEffect(() => {
    setSongEndEvtListeners();
  }, [loop]);

  return (
    <Player
      song={song}
      section={section}
      changeSpeed={changeSpeed}
      startSong={startSong}
      isPlaying={isPlaying}
      setIsPlaying={setIsPlaying}
      loop={loop}
      setLoop={setLoop}
      toggleOne={toggleOne}
      toggle={toggle}
    />
  );
};

export default Audio;
