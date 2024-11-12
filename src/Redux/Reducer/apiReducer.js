import { createSlice } from "@reduxjs/toolkit";
import { listPokemon } from "../Action/apiAction";


const apiSlice = createSlice({
    name: "auth",
    initialState: {
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(listPokemon.fulfilled, (state, action) => {
          state.loginAPIResponse = { status: "succeeded", data: action.payload };
        })
        .addCase(listPokemon.rejected, (state, action) => {
          state.loginAPIResponse = {
            status: "failed",
            error: action.error.message,
          };
        });
    },
  });
  
  export default apiSlice.reducer;