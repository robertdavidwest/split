import React from "react";
import { useSelector } from "react-redux";
import Audio from "../audio/Audio";
/**
 * COMPONENT
 */
const Home = (props) => {
  const username = useSelector((state) => state.auth.me.username);

  const song = { audioUrl: "02 - Pride and Joy.mp3", id: 1 };

  return (
    <div>
      <h3>Welcome, {username}</h3>
      <Audio song={song} />
    </div>
  );
};

export default Home;
