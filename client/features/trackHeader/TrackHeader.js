import * as React from "react";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

import { TextField } from "@mui/material";

const Widget = styled("div")(({ theme }) => ({
  padding: 16,
  borderRadius: 16,
  backgroundColor:
    theme.palette.mode === "dark" ? "rgba(0,0,0,0.6)" : "rgba(255,255,255,0.4)",
  backdropFilter: "blur(40px)",
}));

export default function TrackHeader({ mp3Filename, dftSongName, dftArtist }) {
  const [songName, setSongName] = React.useState(dftSongName);
  const [artist, setArtist] = React.useState(dftArtist);

  return (
    <Widget>
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
    </Widget>
  );
}
