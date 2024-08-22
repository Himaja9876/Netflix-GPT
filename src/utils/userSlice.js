import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    uid: null,
    email: null,
    displayName: null,
    photoURL: null,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        addUser: (state, action) => {
            return {
                ...state,
                ...action.payload,
            };
        },
        removeUser: () => {
            return initialState;
        }
    }
});

export const { addUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
