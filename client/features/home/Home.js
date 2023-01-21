import React from "react";
import { useSelector } from "react-redux";
import { WallPaper } from "../wallPaper/Wallpaper";
import { AudioGrid } from "../audioGrid/AudioGrid";
/**
 * COMPONENT
 */

const Home = (props) => {
  const username = useSelector((state) => state.auth.me.username);
  return (
    <div>
      <h3>Welcome, {username}</h3>
      <AudioGrid />
      <WallPaper />
    </div>
  );
};

export default Home;
