import Card from "@mui/material/Card"
import CardActions from "@mui/material/CardActions"
import CardContent from "@mui/material/CardContent"
import CardMedia from "@mui/material/CardMedia"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import "../styles/Home.css"
import { Link } from "react-router-dom"

function Product({ product }) {
  return (
    <li>
      <Card className="product__card" sx={{ maxWidth: 400, maxHeight: 400 }}>
        <Link to={`/product/${product.id}`}>
          <CardMedia
            component="img"
            alt={product.title}
            height="140"
            image={product?.images?.[0].url}
            className="product__img"
          />
          <CardContent>
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
          <Button
            onClick={() => {
              console.log("BEUANSS")
            }}
            size="small"
          >
            Añadir al carrito
          </Button>
        </CardActions>
      </Card>
    </li>
  )
}

export default Product
