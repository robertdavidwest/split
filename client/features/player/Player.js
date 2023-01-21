import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Slider from "@mui/material/Slider";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";

import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import LoopIcon from "@mui/icons-material/Loop";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import SlowMotionVideoIcon from "@mui/icons-material/SlowMotionVideo";
import { TextField } from "@mui/material";
import Grid from "@mui/material/Grid";

const WallPaper = styled("div")({
  position: "absolute",
  width: "100%",
  height: "100%",
  top: 0,
  left: 0,
  overflow: "hidden",

  background: "linear-gradient(rgb(255, 38, 142) 0%, rgb(255, 105, 79) 100%)",
  transition: "all 500ms cubic-bezier(0.175, 0.885, 0.32, 1.275) 0s",
  "&:before": {
    content: '""',
    width: "140%",
    height: "140%",
    position: "absolute",
    top: "-40%",
    right: "-50%",
    background:
      "radial-gradient(at center center, rgb(62, 79, 249) 0%, rgba(62, 79, 249, 0) 64%)",
  },
  "&:after": {
    content: '""',
    width: "140%",
    height: "140%",
    position: "absolute",
    bottom: "-50%",
    left: "-30%",
    background:
      "radial-gradient(at center center, rgb(247, 237, 225) 0%, rgba(247, 237, 225, 0) 70%)",
    transform: "rotate(30deg)",
  },
});

const Widget = styled("div")(({ theme }) => ({
  padding: 16,
  borderRadius: 16,
  width: 343,
  maxWidth: "100%",
  margin: "auto",
  position: "relative",
  zIndex: 1,
  backgroundColor:
    theme.palette.mode === "dark" ? "rgba(0,0,0,0.6)" : "rgba(255,255,255,0.4)",
  backdropFilter: "blur(40px)",
}));

const TinyText = styled(Typography)({
  fontSize: "0.75rem",
  opacity: 0.38,
  fontWeight: 500,
  letterSpacing: 0.2,
});

export default function Player({
  start,
  setStart,
  end,
  setEnd,
  duration,
  currentTime,
  restart,
  loadPlayPause,
  isPlaying,
  loop,
  toggleLoop,
  sectionLabel,
  setPlayback,
  playbackRate,
  setAudioPlaybackRate,
}) {
  if (!start) start = 0;
  if (!end) end = duration;

  const setPlaybackManually = (value) => {
    setPlayback(value);
    setPosition(value);
  };

  React.useEffect(() => {
    setPosition(Math.round(currentTime));
  }, [currentTime]);

  const theme = useTheme();
  const [position, setPosition] = React.useState(0);
  function formatDuration(value) {
    const minute = Math.floor(value / 60);
    const secondLeft = value - minute * 60;
    return `${minute}:${secondLeft < 10 ? `0${secondLeft}` : secondLeft}`;
  }
  const mainIconColor = theme.palette.mode === "dark" ? "#fff" : "#000";
  const lightIconColor =
    theme.palette.mode === "dark" ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.4)";

  const maxMins = Math.floor(duration / 60);
  const remainingSeconds = duration - maxMins * 60;

  const [startMinutes, setStartMinutes] = React.useState(0);
  const [startSeconds, setStartSeconds] = React.useState(0);
  const [endMinutes, setEndMinutes] = React.useState(maxMins);
  const [endSeconds, setEndSeconds] = React.useState(remainingSeconds);

  const changeMinutes = (value, startOrEnd) => {
    value = Number(value);
    value = Math.min(maxMins, value);

    if (startOrEnd === "start") setStartMinutes(value);
    else if (startOrEnd === "end") setEndMinutes(value);
  };

  const changeSeconds = (value, startOrEnd) => {
    value = Number(value);
    let minutes;
    if (startOrEnd === "start") minutes = startMinutes;
    else if (startOrEnd === "end") minutes = endMinutes;

    let priorSeconds;
    if (startOrEnd === "start") priorSeconds = startSeconds;
    else if (startOrEnd === "end") priorSeconds = endSeconds;

    let valueMinutes;
    if ((value === 60) & (priorSeconds === 59) & (minutes < maxMins)) {
      value = 0;
      valueMinutes = minutes + 1;
    } else if ((value === -1) & (priorSeconds === 0) & (minutes > 0)) {
      value = 59;
      valueMinutes = minutes - 1;
    } else {
      const maxSeconds = minutes === maxMins ? remainingSeconds : 59;
      value = Math.min(maxSeconds, value);
    }

    if (startOrEnd === "start") setStartSeconds(value);
    else if (startOrEnd === "end") setEndSeconds(value);
    if (!(typeof valueMinutes === "undefined")) {
      if (startOrEnd === "start") setStartMinutes(valueMinutes);
      else if (startOrEnd === "end") setEndMinutes(valueMinutes);
    }
  };

  const changeStartMinutes = (value) => {
    value = Number(value);
    // ensure start time never after end time
    value = Math.min(value, endMinutes);
    changeMinutes(value, "start");
  };

  const changeStartSeconds = (value) => {
    value = Number(value);
    // ensure start time never after end time
    const maxValue = end - startMinutes * 60;
    value = Math.min(value, maxValue);
    changeSeconds(value, "start");
  };

  const changeEndMinutes = (value) => {
    value = Number(value);
    // ensure start time never after end time
    value = Math.max(value, startMinutes);
    changeMinutes(value, "end");
  };

  const changeEndSeconds = (value) => {
    value = Number(value);
    // ensure start time never after end time
    const minValue = start - endMinutes * 60;
    value = Math.max(value, minValue);
    changeSeconds(value, "end");
  };

  React.useEffect(() => {
    const maxMins = Math.floor(duration / 60);
    const remainingSeconds = duration - maxMins * 60;

    setEndMinutes(maxMins);
    setEndSeconds(remainingSeconds);
  }, [duration]);

  React.useEffect(() => {
    const currentStartSeconds = startSeconds + startMinutes * 60;
    setStart(currentStartSeconds);

    const currentEndSeconds = endSeconds + endMinutes * 60;
    setEnd(currentEndSeconds);
  }, [startSeconds, startMinutes, endSeconds, endMinutes]);

  return (
    <Box sx={{ width: "100%", overflow: "hidden" }}>
      <Widget>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography noWrap letterSpacing={-0.25}>
            {sectionLabel}
          </Typography>
        </Box>
        <Grid
          container
          spacing={2}
          columns={15}
          sx={{
            marginBottom: "10px",
          }}
        >
          <Grid item xs={7}>
            <Typography
              variant="caption"
              color="text.secondary"
              fontWeight={500}
            >
              {"Start"}
            </Typography>
            <Grid container spacing={2} columns={2}>
              <Grid item xs={1}>
                <TextField
                  size="small"
                  helperText="minutes"
                  placeholder={"MM"}
                  value={startMinutes}
                  type="number"
                  onChange={(e) => changeStartMinutes(e.target.value)}
                  InputProps={{
                    inputProps: { min: 0 },
                  }}
                />
              </Grid>
              <Grid item xs={1}>
                <TextField
                  size="small"
                  helperText="seconds"
                  placeholder={"SS"}
                  value={startSeconds}
                  type="number"
                  onChange={(e) => changeStartSeconds(e.target.value)}
                  InputProps={{
                    inputProps: { min: -1 },
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={1}></Grid>
          <Grid item xs={7}>
            <Typography
              variant="caption"
              color="text.secondary"
              fontWeight={500}
            >
              {"End"}
            </Typography>
            <Grid container spacing={2} columns={2}>
              <Grid item xs={1}>
                <TextField
                  size="small"
                  helperText="minutes"
                  placeholder={"MM"}
                  value={endMinutes}
                  type="number"
                  onChange={(e) => changeEndMinutes(e.target.value)}
                  InputProps={{
                    inputProps: { min: 0 },
                  }}
                />
              </Grid>
              <Grid item xs={1}>
                <TextField
                  size="small"
                  helperText="seconds"
                  placeholder={"SS"}
                  value={endSeconds}
                  type="number"
                  onChange={(e) => changeEndSeconds(e.target.value)}
                  InputProps={{
                    inputProps: { min: -1 },
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Slider
          aria-label="time-indicator"
          size="small"
          value={position}
          min={Number(start)}
          step={0.1}
          max={Number(end)}
          onChange={(_, value) => setPlaybackManually(value)}
          sx={{
            color: theme.palette.mode === "dark" ? "#fff" : "rgba(0,0,0,0.87)",
            height: 4,
            "& .MuiSlider-thumb": {
              width: 8,
              height: 8,
              transition: "0.3s cubic-bezier(.47,1.64,.41,.8)",
              "&:before": {
                boxShadow: "0 2px 12px 0 rgba(0,0,0,0.4)",
              },
              "&:hover, &.Mui-focusVisible": {
                boxShadow: `0px 0px 0px 8px ${
                  theme.palette.mode === "dark"
                    ? "rgb(255 255 255 / 16%)"
                    : "rgb(0 0 0 / 16%)"
                }`,
              },
              "&.Mui-active": {
                width: 20,
                height: 20,
              },
            },
            "& .MuiSlider-rail": {
              opacity: 0.28,
            },
          }}
        />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mt: -2,
          }}
        >
          <TinyText>{formatDuration(start)}</TinyText>
          <TinyText>-{formatDuration(end - position)}</TinyText>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mt: -1,
          }}
        >
          <IconButton aria-label="restart" onClick={restart}>
            <RestartAltIcon />
          </IconButton>
          <IconButton aria-label="play/pause" onClick={loadPlayPause}>
            {isPlaying ? (
              <PauseIcon sx={{ height: 38, width: 38 }} />
            ) : (
              <PlayArrowIcon sx={{ height: 38, width: 38 }} />
            )}
          </IconButton>
          <IconButton aria-label="loop" onClick={toggleLoop}>
            {loop ? <LoopIcon sx={{ color: "lightgreen" }} /> : <LoopIcon />}
          </IconButton>
        </Box>
        <Stack
          spacing={2}
          direction="row"
          sx={{ mb: 1, px: 1 }}
          alignItems="center"
        >
          <SlowMotionVideoIcon htmlColor={lightIconColor} />
          <TinyText>{playbackRate}</TinyText>
          <Slider
            aria-label="Speed"
            value={playbackRate}
            min={0}
            step={0.1}
            max={2}
            onChange={(_, value) => setAudioPlaybackRate(value)}
            sx={{
              color:
                theme.palette.mode === "dark" ? "#fff" : "rgba(0,0,0,0.87)",
              "& .MuiSlider-track": {
                border: "none",
              },
              "& .MuiSlider-thumb": {
                width: 24,
                height: 24,
                backgroundColor: "#fff",
                "&:before": {
                  boxShadow: "0 4px 8px rgba(0,0,0,0.4)",
                },
                "&:hover, &.Mui-focusVisible, &.Mui-active": {
                  boxShadow: "none",
                },
              },
            }}
          />
        </Stack>
      </Widget>
      {/* <WallPaper /> */}
    </Box>
  );
}
