import {configureStore} from "@reduxjs/toolkit"
import userReducer from "./userSlice"
import feedReducer from "./feedSlice"
import connectionReducer from "./connectionSlice"
const appStore = configureStore({
    reducer: {
        user: userReducer,
        userFeed: feedReducer,
        userConnection: connectionReducer,
    }
})

export default appStore;