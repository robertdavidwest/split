import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchSongSectionsAsync = createAsyncThunk(
  "songSections",
  async (songId) => {
    try {
      const { data } = await axios.get(`api/songs/${songId}`);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const createSectionAsync = createAsyncThunk(
  "createSection",
  async (payload) => {
    try {
      const { data } = await axios.post("api/sections", payload);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const audioGridSlice = createSlice({
  name: "audioGrid",
  initialState: { song: {}, sections: [] },
  reducers: {
    createSection(state, action) {
      state.sections.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSongSectionsAsync.fulfilled, (state, action) => {
      const { sections, ...rest } = action.payload;
      state.sections = sections;
      state.song = rest;
    });
  },
});

export const selectSong = (state) => {
  return state.audioGrid.song;
};

export const selectSongSections = (state) => {
  return state.audioGrid.sections;
};

export const { createSection } = audioGridSlice.actions;
export default audioGridSlice.reducer;
