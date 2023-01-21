import React from "react";
import MusicPlayerSlider from "./MusicPlayerSlider";

const Player = (props) => {
  const {
    duration,
    start,
    setStart,
    end,
    setEnd,
    currentTime,
    section,
    startSong,
    isPlaying,
    loop,
    toggleLoop,
    loadPlayPause,
    setPlayback,
    playbackRate,
    setAudioPlaybackRate,
  } = props;

  return (
    <div>
      <MusicPlayerSlider
        sectionLabel={section.label}
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
      />
    </div>
  );
};

export default Player;
