import { configureStore } from "@reduxjs/toolkit"
import products from "./slices/productsSlice"
import user from "./slices/userSlice"
import cart from "./slices/cartSlice"
import isLoading from "./slices/isLoadingSlice"

// eslint-disable-next-line react-refresh/only-export-components
export default configureStore({
  reducer: {
    products,
    user,
    cart,
    isLoading
  }
})
