import React from "react";
import Audio from "../audio/Audio";
import TrackHeader from "../trackHeader/TrackHeader";

import { Grid } from "@mui/material";
import { Container } from "@mui/material";

export const AudioGrid = (props) => {
  const song = {
    audioUrl: "02 - Pride and Joy.mp3",
    id: 1,
    songName: "Pride & Joy",
    artist: "Stevie Ray Vaughan",
  };

  const audioElements = [
    document.createElement("audio"),
    document.createElement("audio"),
    document.createElement("audio"),
    document.createElement("audio"),
  ];

  return (
    <Container>
      <Grid container columns={1} rowSpacing={2}>
        <Grid item md={1}>
          <TrackHeader
            mp3Filename={song.audioUrl}
            dftSongName={song.songName}
            dftArtist={song.artist}
          />
        </Grid>

        <Grid item md={1}>
          <Grid container spacing={2} columns={2} rowSpacing={2}>
            {audioElements.map((audio, i) => (
              <Grid key={i} item sm={2} md={1}>
                <Audio song={song} label={`Section ${i + 1}`} audio={audio} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};
