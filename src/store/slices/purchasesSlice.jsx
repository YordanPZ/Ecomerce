import { createSlice } from "@reduxjs/toolkit"

export const purchasesSlice = createSlice({
  name: "purchases",
  initialState: [],
  reducers: {
    setPurchases: (state, action) => {
      const purchases = [...state, action.payload]
      return purchases
    }
  }
})

export const { setPurchases } = purchasesSlice.actions

export default purchasesSlice.reducer
