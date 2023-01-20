import React from "react";
import { useSelector } from "react-redux";
import Audio from "../audio/Audio";
/**
 * COMPONENT
 */
const Home = (props) => {
  const username = useSelector((state) => state.auth.me.username);

  // AUDIO.duration
  // 219.402449

  const song = { audioUrl: "02 - Pride and Joy.mp3", id: 1 };
  const section = {
    label: "Solo",
    // start: "100",
    // start: "215",
    // end: "217",
    // end: "102",
    units: "seconds",
  };

  if (!section.start) section["start"] = null;
  if (!section.end) section["end"] = null;

  return (
    <div>
      <h3>Welcome, {username}</h3>
      <Audio song={song} section={section} />
    </div>
  );
};

export default Home;
