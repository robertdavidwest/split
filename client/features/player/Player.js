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
    toggle,
    toggleOne,
  } = props;

  const toggleLoop = () => {
    setLoop(!loop);
  };

  const restart = () => {
    setIsPlaying(true);
    startSong(song);
  };

  const playPause = () => {
    setIsPlaying(!isPlaying);
    toggleOne(song);
    // toggle();
  };
  const speed = () => changeSpeed(0.5);

  return (
    <div>
      <MediaControlCard
        sectionLabel={section.label}
        restart={restart}
        playPause={playPause}
        loop={loop}
        toggleLoop={toggleLoop}
        isPlaying={isPlaying}
      />
      <div id="player-controls">
        <div className="row center">
          <div onClick={restart}>Restart </div>
          <div onClick={playPause}>Play/Pause </div>
          <div onClick={speed}>Change Speed </div>
        </div>
      </div>
    </div>
  );
};

export default Player;
