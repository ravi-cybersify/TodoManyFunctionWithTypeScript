import { configureStore } from "@reduxjs/toolkit";
import todoSlice from './todoSlice.tsx'

const store = configureStore({
    reducer: todoSlice
})

export default store;