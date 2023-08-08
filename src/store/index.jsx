import { configureStore } from "@reduxjs/toolkit"
import products from "./slices/productsSlice"
import user from "./slices/userSlice"
import purchases from "./slices/purchasesSlice"

export default configureStore({
  reducer: {
    products,
    user,
    purchases
  }
})
