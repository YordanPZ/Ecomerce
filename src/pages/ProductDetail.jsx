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
import { setPurchases } from "../store/slices/purchasesSlice"

function ProductDetail() {
  const { id } = useParams()
  const dispatch = useDispatch()
  const [productDetail, setProductDetail] = useState({})
  const products = useSelector((state) => state.products)

  useEffect(() => {
    getDetail()
  }, [id])

  const getDetail = () => {
    axios
      .get(`https://e-commerce-api-v2.academlo.tech/api/v1/products/${id}`)
      .then((res) => {
        setProductDetail(res.data)
        dispatch(filteredProductsByCategoryThunk(res.data.category.id))
      })
      .catch((err) => console.log(err))
  }

  const productBought = () => {
    const purchases = {
      id: productDetail.id,
      title: productDetail.title,
      price: productDetail.price,
      date: new Date()
    }
    dispatch(setPurchases(purchases))
  }

  return (
    <main>
      <section className="section__productDetail">
        <div>
          <Gallery product={productDetail} />
        </div>
        <div>
          <h1 className="product__title">{productDetail?.title}</h1>
          <div className="productDetail__description">
            <p>{productDetail?.description}</p>
          </div>
          <h2 className="product__price">$ {productDetail?.price}</h2>
          <div>
            <button>Add to cart</button>
            <button onClick={productBought}>Buy</button>
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
