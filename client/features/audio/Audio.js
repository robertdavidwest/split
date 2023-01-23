import React, { useState, useEffect } from "react";
import Player from "../player/Player";

const Audio = ({ song, section, audio, deletePlayer }) => {
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
    audio.src = src;
  }

  async function play() {
    await audio.play();
    setIsPlaying(true);
  }

  function pause() {
    audio.pause();
    setIsPlaying(false);
  }

  async function load() {
    addSrc();
    audio.load();
    setLoaded(true);
    audio.onloadedmetadata = function () {
      const orig = Math.round(audio.duration);
      setDuration(orig);
    };

    setAudioPlaybackRate(playbackRate);
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
    audio.currentTime = value;
  };

  const setAudioPlaybackRate = (value) => {
    audio.playbackRate = value;
    setPlaybackRate(value);
  };

  audio.addEventListener(
    "timeupdate",
    () => setCurrentTime(audio.currentTime),
    false
  );

  useEffect(() => {
    const wasPlaying = isPlaying;
    load();
    if (wasPlaying) play();
  }, [start, end]);

  useEffect(() => {
    if (audio.currentTime >= end) {
      setIsPlaying(false);
      load();
      if (loop) play();
    }
  }, [audio.paused]);

  useEffect(() => {
    if (song.duration) setDuration(song.duration);
    setStart(section.start);
    setEnd(section.end);
    setLoop(section.loop);
    setAudioPlaybackRate(section.playbackRate);
  }, [song, section]);

  const sectionId = section.id;
  const inMemoryId = section.inMemoryId;
  const label = section.label;

  return (
    <Player
      sectionId={sectionId}
      inMemoryId={inMemoryId}
      label={label}
      restart={startSong}
      start={start}
      setStart={setStart}
      end={end}
      setEnd={setEnd}
      duration={duration}
      currentTime={currentTime}
      loadPlayPause={loadPlayPause}
      loop={loop}
      toggleLoop={toggleLoop}
      isPlaying={isPlaying}
      setPlayback={setPlayback}
      playbackRate={playbackRate}
      setAudioPlaybackRate={setAudioPlaybackRate}
      deletePlayer={deletePlayer}
    />
  );
};

export default Audio;
