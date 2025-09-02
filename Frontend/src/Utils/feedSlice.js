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
    }
})
export const {addfeed} = feedSlice.actions;
export default feedSlice.reducer;