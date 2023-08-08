import { createSlice } from "@reduxjs/toolkit"
import axios from "axios"

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

export const getProductsThunk = (data) => (dispatch) => {
  //Traer la informacion de los productos desde el backend y setearlo en el estado

  axios
    .get("https://e-commerce-api-v2.academlo.tech/api/v1/products")
    .then((resp) => dispatch(setProducts(resp.data)))
    .catch((err) => console.log(err))
}

export const filteredProductsByCategoryThunk = (id) => (dispatch) => {
 
  axios
    .get(`https://e-commerce-api-v2.academlo.tech/api/v1//products?categoryId=${id}`)
    .then((res) => dispatch(setProducts(res.data)))
    .catch((err) => console.log(err))
}
export const filteredProductsByNameThunk = (name) => (dispatch) => {
 
  axios
    .get(`https://e-commerce-api-v2.academlo.tech/api/v1/products?title=${name}`)
    .then((res) => dispatch(setProducts(res.data)))
    .catch((err) => console.log(err))
}

export const { setProducts } = productsSlice.actions

export default productsSlice.reducer
