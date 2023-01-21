import React, { useState, useEffect } from "react";
import Player from "../player/Player";

const AUDIO = document.createElement("audio");
AUDIO.setAttribute("preload", "metadata");

const Audio = ({ song, section }) => {
  const [loaded, setLoaded] = useState(false);
  const [duration, setDuration] = useState(0);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(duration);
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [loop, setLoop] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1.0);

  function addSrc() {
    let src = song.audioUrl;
    let _start;
    if (!start) _start = 0;
    else _start = start;
    src += `#t=${_start}`;
    if (end) {
      src += `,${end}`;
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

  async function load() {
    addSrc();
    AUDIO.load();
    setLoaded(true);
    AUDIO.onloadedmetadata = function () {
      const orig = Math.round(AUDIO.duration);
      setDuration(orig);
    };
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

  const setPlayback = (value) => {
    AUDIO.currentTime = value;
  };

  const setAudioPlaybackRate = (value) => {
    AUDIO.playbackRate = value;
    setPlaybackRate(value);
  };

  AUDIO.addEventListener(
    "timeupdate",
    () => setCurrentTime(AUDIO.currentTime),
    false
  );

  useEffect(() => {
    const wasPlaying = isPlaying;
    load();
    if (wasPlaying) play();
  }, [start, end]);

  useEffect(() => {
    if (AUDIO.currentTime >= end) {
      setIsPlaying(false);
      load();
      if (loop) play();
    }
  }, [AUDIO.paused]);

  return (
    <Player
      duration={duration}
      start={start}
      setStart={setStart}
      end={end}
      setEnd={setEnd}
      currentTime={currentTime}
      section={section}
      startSong={startSong}
      isPlaying={isPlaying}
      loadPlayPause={loadPlayPause}
      loop={loop}
      toggleLoop={toggleLoop}
      setPlayback={setPlayback}
      playbackRate={playbackRate}
      setAudioPlaybackRate={setAudioPlaybackRate}
    />
  );
};

export default Audio;
