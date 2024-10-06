// trailerSlice.js
import { createSlice } from "@reduxjs/toolkit";

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
});

export const { addTrailerKey } = trailerSlice.actions;
export default trailerSlice.reducer;
