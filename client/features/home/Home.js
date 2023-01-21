import React from "react";
import { useSelector } from "react-redux";
import Audio from "../audio/Audio";
import { WallPaper } from "../wallPaper/Wallpaper";
/**
 * COMPONENT
 */

const Home = (props) => {
  const username = useSelector((state) => state.auth.me.username);
  const song = { audioUrl: "02 - Pride and Joy.mp3", id: 1 };
  const audioElements = [
    document.createElement("audio"),
    document.createElement("audio"),
  ];

  return (
    <div>
      <h3>Welcome, {username}</h3>
      {audioElements.map((audio, i) => (
        <Audio key={i} song={song} label={`Section ${i + 1}`} audio={audio} />
      ))}
      <WallPaper />
    </div>
  );
};

export default Home;
