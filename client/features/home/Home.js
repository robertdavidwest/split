import React from "react";
import { useSelector } from "react-redux";
import Audio from "../audio/Audio";
/**
 * COMPONENT
 */
const Home = (props) => {
  const username = useSelector((state) => state.auth.me.username);

  return (
    <div>
      <h3>Welcome, {username}</h3>
      <Audio />
    </div>
  );
};

export default Home;
