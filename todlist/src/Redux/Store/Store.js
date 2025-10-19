import { configureStore } from "@reduxjs/toolkit";
import todoReducers from "../Slices/TodoSlices"
export const store =configureStore({
    reducer:{
        todo: todoReducers
    }
})