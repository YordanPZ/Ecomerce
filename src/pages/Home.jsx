import { useEffect, useState, useMemo } from "react"
import { getProductsThunk } from "../store/slices/productsSlice"
import { useSelector, useDispatch } from "react-redux"
import Product from "../components/Product"
import "../styles/Home.css"
import axios from "axios"
import { filteredProductsByCategoryThunk } from "../store/slices/productsSlice"
import TextField from "@mui/material/TextField"
import Box from "@mui/material/Box"
import { filteredProductsByNameThunk } from "../store/slices/productsSlice"

function Home() {
  //Voy a usar metodologia BEM para nombrar las clases
  const dispatch = useDispatch()
  const products = useSelector((state) => state.products)
  const [categories, setCategories] = useState([])
  const [search, setSearch] = useState("")

  useEffect(() => {
    dispatch(getProductsThunk())
    getCategories()

  }, [])

  const getCategories = () => {
    axios
      .get("https://e-commerce-api-v2.academlo.tech/api/v1/categories")
      .then((res) => setCategories(res.data))
      .catch((err) => console.log(err))
  }
  const memoizedRamdomNumber = useMemo(
    () => Math.floor(Math.random() * products?.length),
    [products]
  )
  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(filteredProductsByNameThunk(search))
  }
  console.log(search)

  return (
    <>
      <main className="main__home">
        <h1>Productos</h1>
        <section className="main__discounts">
          <div className="main__discounts--container">
            <div className="main__discounts--content">
              <h2>20% off</h2>
              <h3>{products?.[memoizedRamdomNumber]?.title}</h3>
              <p style={{ textDecoration: "line-through", opacity: "0.5" }}>
                $ {products?.[memoizedRamdomNumber]?.price}
              </p>
              <p className="main__discounts--discount">
                $ {(products?.[memoizedRamdomNumber]?.price * 0.8).toFixed(2)}
              </p>
            </div>
            <img
              className="main__discounts--img"
              src={products?.[memoizedRamdomNumber]?.images[0]?.url}
              alt=""
            />
          </div>
        </section>
        <section className="main__products">
          <div className="main__products--categories">
            <h4>Categorias</h4>
            <ul className="main__category--list">
              <li
                className="main__category--item"
                onClick={() => dispatch(getProductsThunk())}
                key="all"
              >
                All
              </li>
              {categories?.map((category) => (
                <li
                  className="main__category--item"
                  onClick={() =>
                    dispatch(filteredProductsByCategoryThunk(category.id))
                  }
                  key={category.id}
                >
                  {category.name}
                </li>
              ))}
            </ul>
          </div>
          <div className="main__products--container">
            <div>
              <Box
                component="form"
                sx={{
                  "& > :not(style)": { m: 1, width: "30%" }
                }}
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit}
              >
                <TextField
                  id="filled-basic"
                  label="Search Products"
                  variant="filled"
                  onChange={(e) => setSearch(e.target.value)}
                  value={search}
                />
              </Box>
            </div>
            <ul className="main__products--list">
              {products?.map((item) => (
                <Product product={item} key={item.id} />
              ))}
            </ul>
          </div>
        </section>
      </main>
    </>
  )
}

export default Home