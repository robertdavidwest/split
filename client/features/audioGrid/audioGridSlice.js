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

export const deleteSectionAsync = createAsyncThunk(
  "deleteSection",
  async (sectionId) => {
    try {
      const { data } = await axios.delete(`api/sections/${sectionId}`);
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
    deleteSection(state, action) {
      const inMemoryId = action.payload;
      state.sections = state.sections.filter(
        (x) => x.inMemoryId !== inMemoryId
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSongSectionsAsync.fulfilled, (state, action) => {
      const { sections, ...rest } = action.payload;
      state.sections = sections.map((x, i) => {
        x["inMemoryId"] = i;
        return x;
      });
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

export const { createSection, deleteSection } = audioGridSlice.actions;
export default audioGridSlice.reducer;
