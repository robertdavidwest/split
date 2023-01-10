import React from "react";

const Player = (props) => {
  const { startSong, toggleOne } = props;
  const song = { audioUrl: "02 - Pride and Joy.mp3", id: 1 };

  const restart = () => startSong(song);
  const playPause = () => toggleOne(song);

  return (
    <div>
      <div id="player-controls">
        <div className="row center">
          <div onClick={restart}>Restart </div>
          <div onClick={playPause}>Play/Pause </div>
        </div>
      </div>
    </div>
  );
};

export default Player;
