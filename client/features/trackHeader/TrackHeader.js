import * as React from "react";
import Typography from "@mui/material/Typography";
import { TextField } from "@mui/material";

import { HeaderWidget } from "../widget/Widget";

export default function TrackHeader({ mp3Filename, dftSongName, dftArtist }) {
  const [songName, setSongName] = React.useState(dftSongName);
  const [artist, setArtist] = React.useState(dftArtist);

  return (
    <HeaderWidget>
      <TextField
        size="small"
        label="Song Name"
        variant="standard"
        value={songName}
        onChange={(e) => setSongName(e.target.value)}
      />
      <TextField
        size="small"
        label="Artist"
        variant="standard"
        value={artist}
        onChange={(e) => setArtist(e.target.value)}
      />
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        {mp3Filename}
      </Typography>
    </HeaderWidget>
  );
}
