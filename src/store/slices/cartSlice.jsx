import { createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import getConfig from "../../utils/getConfig"
import { setIsLoading } from "./isLoadingSlice"
import { toast } from "sonner"

export const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    setCart: (state, action) => {
      return action.payload
    }
  }
})

export const getCartThunk = () => (dispatch) => {
  dispatch(setIsLoading(true))
  axios
    .get("https://ecommerceapi-vscj.onrender.com/cart", getConfig())
    .then((res) => dispatch(setCart(res.data)))
    .catch((err) => console.log(err))
    .finally(() => dispatch(setIsLoading(false)))
}

export const addToCartThunk = (data) => (dispatch) => {
  dispatch(setIsLoading(true))
  axios
    .post("https://ecommerceapi-vscj.onrender.com/cart", data, getConfig())
    .then(() => toast.success("Se agrego correctamente"))
    .catch((err) => console.log(err))
    .finally(() => dispatch(setIsLoading(false)))
}

export const deleteProduct = (item) => (dispatch) => {
  dispatch(setIsLoading(true))
  axios
    .delete(
      `https://ecommerceapi-vscj.onrender.com/cart/${item.id}`,
      getConfig()
    )
    .then(() => {
      dispatch(getCartThunk())
      toast.success("Se elimino correctamente")
    })
    .catch((err) => console.log(err))
    .finally(() => dispatch(setIsLoading(false)))
}

export const buyCartThunk = () => (dispatch) => {
  dispatch(setIsLoading(true))
  axios
    .post("https://ecommerceapi-vscj.onrender.com/purchases", {}, getConfig())
    .then(() => {
      dispatch(getCartThunk())
      toast.success("Compra realizada, puedes verla en Purchases")
    })
    .catch((err) => console.log(err))
    .finally(() => dispatch(setIsLoading(false)))
}

export const updatePurchasesTunk = (id, quantity) => (dispatch) => {
  dispatch(setIsLoading(true))

  const body = {
    quantity: quantity
  }
  axios
    .put(
      `https://ecommerceapi-vscj.onrender.com/cart/${id} `,
      body,
      getConfig()
    )
    .then(() => {
      dispatch(getCartThunk())
    })
    .catch((error) => console.error(error))
    .finally(() => dispatch(setIsLoading(false)))
}

export const { setCart } = cartSlice.actions

export default cartSlice.reducer
