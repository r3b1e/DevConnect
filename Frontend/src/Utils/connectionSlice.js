import { createSlice } from "@reduxjs/toolkit";

const connectionSlice = createSlice({
  name: "userConnection",
  initialState: {
    interestedItems: [],
    connectedItems: [],
  },
  reducers: {
    addInterested: (state, action) => {
      state.interestedItems.push(...action.payload);
    },
    removeInterested: (state, action) => {
        const newArray = state.interestedItems.filter((r) => r?.fromUserId?._id?.toString() !== action.payload?.toString());
        state.interestedItems = newArray;
    },
    addConnected: (state, action) => {
      state.connectedItems.push(...action.payload);
    },
    removeConnected: (state, action) => {
      
      state.connectedItems.length = 0;
    },
  },
});
export const {
  addInterested,
  removeInterested,
  addConnected,
  removeConnected,
} = connectionSlice.actions;
export default connectionSlice.reducer;
