import { createSlice } from '@reduxjs/toolkit'

export const searchDataSlice = createSlice({
  name: 'searchData',
  initialState: {
    recentSearches: [],
    selectedRecentSearch: null
  },
  reducers: {
    addSearchData: (state, action) => {
      state.recentSearches = [...state.recentSearches, action.payload]
    },
    setSelectedRecentSearch: (state, action) => {
      state.selectedRecentSearch = action.payload
    }
  },
})

export const { addSearchData, setSelectedRecentSearch } = searchDataSlice.actions

export default searchDataSlice.reducer