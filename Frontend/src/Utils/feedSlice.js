import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
    name: 'userFeed',
    initialState: {
        items: [],
    },
    reducers: {
        addfeed: (state, action) => {
            state.items.push(action.payload);
        },
        removeFeed: (state, action) => {
            state.items.length = 0;
        }
    }
})
export const {addfeed, removeFeed} = feedSlice.actions;
export default feedSlice.reducer;