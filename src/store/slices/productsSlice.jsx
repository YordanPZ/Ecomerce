import { createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { setIsLoading } from "./isLoadingSlice"
import { toast } from "sonner"

export const productsSlice = createSlice({
  name: "products",
  initialState: null,
  reducers: {
    setProducts: (state, action) => {
      return action.payload
    }
  }
})

//Thunk para pedir los productos desde el backend

export const getProductsThunk = () => (dispatch) => {
  //Traer la informacion de los productos desde el backend y setearlo en el estado
  dispatch(setIsLoading(true))

  axios
    .get("https://e-commerce-api-v2.academlo.tech/api/v1/products")
    .then((resp) => dispatch(setProducts(resp.data)))
    .catch((err) => console.log(err))
    .finally(() => dispatch(setIsLoading(false)))
}

export const filteredProductsByCategoryThunk = (id) => (dispatch) => {
  dispatch(setIsLoading(true))
  axios
    .get(
      `https://e-commerce-api-v2.academlo.tech/api/v1//products?categoryId=${id}`
    )
    .then((res) => dispatch(setProducts(res.data)))
    .catch((err) => console.log(err))
    .finally(() => dispatch(setIsLoading(false)))
}
export const filteredProductsByNameThunk = (name) => (dispatch) => {
  dispatch(setIsLoading(true))
  axios
    .get(
      `https://e-commerce-api-v2.academlo.tech/api/v1/products?title=${name}`
    )
    .then((res) => {
      if (res.data.length === 0) {
        dispatch(getProductsThunk())
        toast.error("Articulo no encontrado")
      } else {
        dispatch(setProducts(res.data))
      }
    })
    .catch((err) => console.log(err))
    .finally(() => dispatch(setIsLoading(false)))
}

export const { setProducts } = productsSlice.actions

export default productsSlice.reducer
