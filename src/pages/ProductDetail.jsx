import { useState } from "react"
import { useParams } from "react-router-dom"
import { useEffect } from "react"
import axios from "axios"
import { useDispatch } from "react-redux"
import { filteredProductsByCategoryThunk } from "../store/slices/productsSlice"
import Gallery from "../components/Gallery"
import "../styles/ProductDetail.css"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { addToCartThunk } from "../store/slices/cartSlice"
import { setIsLoading } from "../store/slices/isLoadingSlice"

function ProductDetail() {
  const { id } = useParams()
  const dispatch = useDispatch()
  const [productDetail, setProductDetail] = useState({})
  const products = useSelector((state) => state.products)
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    getDetail()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  const getDetail = () => {
    dispatch(setIsLoading(true))
    axios
      .get(`https://e-commerce-api-v2.academlo.tech/api/v1/products/${id}`)
      .then((res) => {
        setProductDetail(res.data)
        dispatch(filteredProductsByCategoryThunk(res.data.category.id))
      })
      .catch((err) => console.log(err))
      .finally(() => dispatch(setIsLoading(false)))
  }

  const addToCart = () => {
    const product = {
      quantity: quantity,
      productId: id
    }
    dispatch(addToCartThunk(product))
  }

  return (
    <main>
      <section className="section__productDetail">
        <div className="section__productDetail-container">
          <div className="section__gallery--ontainer">
            <Gallery product={productDetail} />
          </div>
          <div>
            <span>{productDetail.brand}</span>
            <h1 className="product__title">{productDetail?.title}</h1>
            <div className="productDetail__description">
              <p>{productDetail?.description}</p>
            </div>

            <div className="section__productDetail--info">
              <div>
                <span>Price:</span>
                <h2 className="product__price">$ {productDetail?.price}</h2>
              </div>
              <div className="productDetail__quantity--container">
                <span className="productDetail__span">Quantity:</span>
                <div className="productDetail__quantity">
                  <div className="quantity__container">
                    <button
                      className="quantity__button"
                      disabled={quantity === 1}
                      onClick={() => setQuantity(quantity - 1)}
                    >
                      -
                    </button>
                    <p>{quantity}</p>
                    <button
                      className="quantity__button"
                      onClick={() => setQuantity(quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                  <div>
                    <button onClick={addToCart} className="CartBtn">
                      <span className="IconContainer">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="1em"
                          viewBox="0 0 576 512"
                          fill="rgb(17, 17, 17)"
                          className="cart"
                        >
                          <path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"></path>
                        </svg>
                      </span>
                      <p className="textt">Add to Cart</p>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section__related">
        <h3 className="related__title">Productos Relacionados</h3>
        <div>
          <ul className="related__list">
            {products?.map((item) => (
              <li className="related__item" key={item.id}>
                <Link to={`/product/${item.id}`}>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <img
                      className="related__img"
                      src={item.images[0].url}
                      alt=""
                    />
                  </div>
                  <p className="related">{item.title}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  )
}

export default ProductDetail
