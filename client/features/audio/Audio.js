import React, { useState, useEffect } from "react";
import Player from "../player/Player";

const AUDIO = document.createElement("audio");
AUDIO.setAttribute("preload", "metadata");

const Audio = ({ song, section }) => {
  const [loaded, setLoaded] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
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

  async function handleSectionEnd(loop) {
    // if section end defined treat it like end of song
    if (AUDIO.currentTime > section.end) {
      load();
      if (loop) {
        await play();
      } else {
        pause();
      }
    }
  }

  async function handleSongEnd(loop) {
    if (loop) {
      loadPlayPause();
      AUDIO.load();
      await play();
    } else {
      pause();
      addSrc();
    }
  }

  function removeSongEndEvtListener(loop) {
    if (section.end) {
      AUDIO.removeEventListener("pause", async () => handleSectionEnd(loop));
    } else {
      AUDIO.removeEventListener("ended", async () => handleSongEnd(loop));
    }
  }

  function setSongEndEvtListener(loop) {
    if (section.end) {
      AUDIO.addEventListener("pause", async () => handleSectionEnd(loop));
    } else {
      AUDIO.addEventListener("ended", async () => handleSongEnd(loop));
    }
  }

  async function load() {
    addSrc();
    AUDIO.load();
    setLoaded(true);
    AUDIO.onloadedmetadata = function () {
      const orig = Math.round(AUDIO.duration);
      // let duration = orig;
      // if (section.start) duration -= section.start;
      // if (section.end) duration -= orig - section.end;
      // setDuration(duration);
      setDuration(orig);
    };
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

  const setPlayback = (value) => {
    AUDIO.currentTime = value;
  };

  useEffect(() => {
    load();
    removeSongEndEvtListener(!loop);
    setSongEndEvtListener(loop);
  }, [loop]);

  return (
    <Player
      audio={AUDIO}
      duration={duration}
      start={section.start}
      end={section.end}
      section={section}
      changeSpeed={changeSpeed}
      startSong={startSong}
      isPlaying={isPlaying}
      loadPlayPause={loadPlayPause}
      loop={loop}
      toggleLoop={toggleLoop}
      setPlayback={setPlayback}
    />
  );
};

export default Audio;
