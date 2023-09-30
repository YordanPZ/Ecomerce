import CardActions from "@mui/material/CardActions"
import CardContent from "@mui/material/CardContent"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import "../styles/Home.css"
import { Link } from "react-router-dom"
import { addToCartThunk } from "../store/slices/cartSlice"
import { useDispatch } from "react-redux"

function Product({ product }) {
  const dispatch = useDispatch()

  const addToCart = () => {
    const item = {
      quantity: 1,
      productId: product.id
    }
    dispatch(addToCartThunk(item))
  }

  return (
    <li className="product__list__container">
      <div className="product__card">
        <Link to={`/product/${product.id}`}>
          <div className="product__img--container">
            <img
              className="product__img"
              src={product?.images?.[0]?.url}
              alt=""
            />
          </div>

          <CardContent className="product__title--item">
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              className="product__title"
            >
              $ {product.price}
            </Typography>
            <Typography variant="p">{product.title}</Typography>
          </CardContent>
        </Link>
        <CardActions>
          <Button onClick={addToCart} size="small">
            Add to cart
          </Button>
        </CardActions>
      </div>
    </li>
  )
}

export default Product
