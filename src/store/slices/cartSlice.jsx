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
    .get("https://e-commerce-api-v2.academlo.tech/api/v1/cart", getConfig())
    .then((res) => dispatch(setCart(res.data)))
    .catch((err) => console.log(err))
    .finally(() => dispatch(setIsLoading(false)))
}

export const addToCartThunk = (data) => (dispatch) => {
  dispatch(setIsLoading(true))
  axios
    .post(
      "https://e-commerce-api-v2.academlo.tech/api/v1/cart",
      data,
      getConfig()
    )
    .then(() => toast.success("Se agrego correctamente"))
    .catch((err) => console.log(err))
    .finally(() => dispatch(setIsLoading(false)))
}

export const deleteProduct = (item) => (dispatch) => {
  dispatch(setIsLoading(true))
  axios
    .delete(
      `https://e-commerce-api-v2.academlo.tech/api/v1/cart/${item.id}`,
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
    .post(
      "https://e-commerce-api-v2.academlo.tech/api/v1/purchases",
      {},
      getConfig()
    )
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
      `https://e-commerce-api-v2.academlo.tech/api/v1/cart/${id} `,
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
