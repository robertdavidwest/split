import { SettingsBluetoothSharp } from "@mui/icons-material";
import React, { useState } from "react";
import MediaControlCard from "./MediaControlCard";
import MusicPlayerSlider from "./MusicPlayerSlider";

const Player = (props) => {
  const {
    duration,
    start,
    end,
    currentTime,
    section,
    changeSpeed,
    startSong,
    isPlaying,
    loop,
    toggleLoop,
    loadPlayPause,
    setPlayback,
  } = props;

  const speed = () => changeSpeed(0.5);

  return (
    <div>
      <MusicPlayerSlider
        sectionLabel={section.label}
        restart={startSong}
        start={start}
        end={end}
        duration={duration}
        currentTime={currentTime}
        loadPlayPause={loadPlayPause}
        loop={loop}
        toggleLoop={toggleLoop}
        isPlaying={isPlaying}
        setPlayback={setPlayback}
      />
      <MediaControlCard
        sectionLabel={section.label}
        restart={startSong}
        loadPlayPause={loadPlayPause}
        loop={loop}
        toggleLoop={toggleLoop}
        isPlaying={isPlaying}
      />
      <div id="player-controls">
        <div className="row center">
          <div onClick={startSong}>Restart </div>
          <div onClick={loadPlayPause}>Play/Pause </div>
          <div onClick={speed}>Change Speed </div>
        </div>
      </div>
    </div>
  );
};

export default Player;
