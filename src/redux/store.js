import { configureStore } from '@reduxjs/toolkit';
import searchDataReducer from './searchDataSlice';

export default configureStore({
  reducer: {
    searchData: searchDataReducer
  },
})