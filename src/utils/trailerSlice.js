// trailerSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { OPTIONS } from "../utils/constants";

export const fetchTrailerForMovie = createAsyncThunk(
  "trailers/fetchTrailerForMovie",
  async (movieId) => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
      OPTIONS
    );
    const data = await response.json();
    const trailerVideo = data.results.find((video) => video.type === "Trailer");
    return { id: movieId, key: trailerVideo ? trailerVideo.key : null };
  }
);

const trailerSlice = createSlice({
  name: "trailers",
  initialState: {
    trailerKeys: {},
  },
  reducers: {
    addTrailerKey: (state, action) => {
      state.trailerKeys[action.payload.id] = action.payload.key;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTrailerForMovie.fulfilled, (state, action) => {
      state.trailerKeys[action.payload.id] = action.payload.key;
    });
  },
});

export const { addTrailerKey } = trailerSlice.actions; // Export the action
export default trailerSlice.reducer;
