import { SettingsBluetoothSharp } from "@mui/icons-material";
import React, { useState } from "react";
import MediaControlCard from "./MediaControlCard";

const Player = (props) => {
  const {
    song,
    section,
    changeSpeed,
    startSong,
    isPlaying,
    setIsPlaying,
    loop,
    setLoop,
    loadPlayPause,
  } = props;

  const toggleLoop = () => {
    setLoop(!loop);
  };

  const restart = () => {
    setIsPlaying(true);
    startSong(song);
  };

  const speed = () => changeSpeed(0.5);

  return (
    <div>
      <MediaControlCard
        sectionLabel={section.label}
        restart={restart}
        loadPlayPause={loadPlayPause}
        loop={loop}
        toggleLoop={toggleLoop}
        isPlaying={isPlaying}
      />
      <div id="player-controls">
        <div className="row center">
          <div onClick={restart}>Restart </div>
          <div onClick={loadPlayPause}>Play/Pause </div>
          <div onClick={speed}>Change Speed </div>
        </div>
      </div>
    </div>
  );
};

export default Player;
