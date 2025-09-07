import { createSlice } from "@reduxjs/toolkit";

const connectionSlice = createSlice({
    name: "onnection",
    initialState: {
        interestedItems:[],
        connectedItems:[],
    },
    reducers: {
        addInterested: (state, action) => {
            state.interestedItems.push(...action.payload);
        },
        removeInterested: (state, action) => {
            state.interestedItems.length=0;
        },
        addConnected: (state, action) => {
            state.connectedItems.push(...action.payload);
        },
        removeConnected: (state, action) => {
            state.connectedItems.length=0;
        }
    }
})
export const {addInterested, removeInterested, addConnected, removeConnected} = connectionSlice.actions;
export default connectionSlice.reducer;