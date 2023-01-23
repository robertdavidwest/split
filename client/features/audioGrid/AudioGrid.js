import React, { useEffect } from "react";
import { Grid } from "@mui/material";
import { Container } from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import {
  fetchSongSectionsAsync,
  createSectionAsync,
  deleteSectionAsync,
  createSection,
  deleteSection,
  selectSong,
  selectSongSections,
} from "./audioGridSlice";
import Audio from "../audio/Audio";
import TrackHeader from "../trackHeader/TrackHeader";
import AddNewPlayer from "../addNewPlayer/AddNewPlayer";

function createAudioElement() {
  return document.createElement("audio");
}

export const AudioGrid = (props) => {
  // songId will be a prop
  // hardcoded for now
  const songId = 1;
  ////////////////////////

  const dispatch = useDispatch();
  let song = useSelector(selectSong);
  const sections = useSelector(selectSongSections);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchSongSectionsAsync(songId));
    };
    fetchData();
  }, [dispatch]);

  async function addNewPlayer() {
    const nextSectionNum = sections.length + 1;
    const payload = {
      songId,
      label: `Section ${nextSectionNum}`,
      start: 0,
      end: song.duration,
      playbackRate: 1.0,
      loop: false,
    };
    await dispatch(createSectionAsync(payload));
    payload["inMemoryId"] = sections.length;
    console.log(payload.inMemoryId);
    dispatch(createSection(payload));
  }

  async function deletePlayer(sectionId, inMemoryId) {
    sectionId = Number(sectionId);
    inMemoryId = Number(inMemoryId);
    if (sectionId) await dispatch(deleteSectionAsync(sectionId));
    dispatch(deleteSection(inMemoryId));
  }
  return (
    <Container>
      <Grid container columns={1} rowSpacing={2}>
        <Grid item md={1}>
          <TrackHeader song={song} />
        </Grid>

        <Grid item md={1}>
          <Grid container spacing={2} columns={2} rowSpacing={2}>
            {sections.map((section, i) => (
              <Grid key={i} item sm={2} md={1}>
                <Audio
                  song={song}
                  section={section}
                  audio={createAudioElement()}
                  deletePlayer={deletePlayer}
                />
              </Grid>
            ))}
            <Grid item sm={2} md={1}>
              <AddNewPlayer addNewPlayer={addNewPlayer} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};
