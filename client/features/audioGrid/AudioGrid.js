import React from "react";
import Audio from "../audio/Audio";

import { Grid } from "@mui/material";
import { Container } from "@mui/material";

export const AudioGrid = (props) => {
  const song = { audioUrl: "02 - Pride and Joy.mp3", id: 1 };
  const audioElements = [
    document.createElement("audio"),
    document.createElement("audio"),
    document.createElement("audio"),
    document.createElement("audio"),
  ];

  return (
    <Container>
      <Grid container spacing={2} columns={2} rowSpacing={6}>
        {audioElements.map((audio, i) => (
          <Grid key={i} item sm={2} md={1}>
            <Audio song={song} label={`Section ${i + 1}`} audio={audio} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};
