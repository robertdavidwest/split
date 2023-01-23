import * as React from "react";
import Typography from "@mui/material/Typography";
import { TextField } from "@mui/material";

import { HeaderWidget } from "../widget/Widget";

export default function TrackHeader({ song }) {
  const [songName, setSongName] = React.useState("");
  const [artist, setArtist] = React.useState("");

  React.useEffect(() => {
    if (song.name) setSongName(song.name);
    if (song.artist) setArtist(song.artist);
  }, [song]);

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
        {song.audioUrl}
      </Typography>
    </HeaderWidget>
  );
}
