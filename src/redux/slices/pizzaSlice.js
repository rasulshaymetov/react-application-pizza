import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const initialState = {
  items: [],
};

export const fetchPizza = createAsyncThunk("pizza/fetchPizzaStatus", async (params,thunkAPI) => {
  const {order, replacing, category, search, currentPage} = params
  const {data} = await axios.get(
    `https://6375ff1eb5f0e1eb85ff4f3c.mockapi.io/Pizzas?page=${currentPage}&limit=4&${search}&${category}&sortBy=${replacing}&order=${order}`
  );
    if(data.length === 0){
      return thunkAPI.rejectWithValue('Пиццы пустые')        
    }
  return thunkAPI.fulfillWithValue(data)
});

const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: {
    [fetchPizza.pending]: (state) => {
      state.status='loading'
      state.items=[]
    },
    [fetchPizza.fulfilled]: (state, action) => {
      state.status='success'
      state.items=action.payload
    },
    [fetchPizza.rejected]: (state) => {
      state.status='error'
      state.items=[]
    },
 
  }
});
export const selectPizzaProperties = (state) => state.pizza

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
