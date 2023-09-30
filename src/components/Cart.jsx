import * as React from "react"
import Modal from "@mui/joy/Modal"
import ModalClose from "@mui/joy/ModalClose"
import Typography from "@mui/joy/Typography"
import Sheet from "@mui/joy/Sheet"
import { useDispatch, useSelector } from "react-redux"
import "../styles/Cart.css"
import { deleteProduct } from "../store/slices/cartSlice"
import { updatePurchasesTunk } from "../store/slices/cartSlice"
import { buyCartThunk } from "../store/slices/cartSlice"

export default function TransitionsModal({ open, setOpen }) {
  const cart = useSelector((state) => state.cart)
  const dispatch = useDispatch()
  const totalPrice = cart.reduce((acc, item) => {
    return acc + item.product?.price * item.quantity
  }, 0)
  console.log(cart)

  const incrementQuantity = (product) => {
    dispatch(updatePurchasesTunk(product.id, product.quantity + 1))
  }

  const decrementQuantity = (product) => {
    if (product.quantity > 1) {
      dispatch(updatePurchasesTunk(product.id, product.quantity - 1))
    }
  }

  return (
    <React.Fragment>
      <Modal
        aria-labelledby="close-modal-title"
        open={open}
        onClose={() => {
          setOpen(false)
        }}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "end"
        }}
      >
        <Sheet variant="outlined" className="modal__container">
          <ModalClose sx={{ mt: 3 }} variant="outlined" />
          <Typography
            component="h2"
            id="close-modal-title"
            level="h4"
            textColor="inherit"
            fontWeight="lg"
          >
            Shopping Cart
          </Typography>
          <main className="main__cart__container">
            {cart?.map((item) => (
              <div className="main__cart" key={item.product?.id}>
                <div className="cart__container">
                  <img
                    src={item.product?.images[0].url}
                    alt={item.product?.title}
                    className="cart__container--image"
                  />
                  <div className="cart__container--info">
                    <div>
                      <Typography
                        className="cart__title"
                        level="h5"
                        textColor="inherit"
                      >
                        {item.product?.title}
                      </Typography>
                    </div>
                    <div className="quantity">
                      <button
                        onClick={() => incrementQuantity(item)}
                        className="quantity__button2"
                      >
                        +
                      </button>
                      <p>{item.quantity}</p>
                      <button
                        onClick={() => decrementQuantity(item)}
                        className="quantity__button2"
                      >
                        -
                      </button>
                    </div>
                  </div>
                </div>
                <div className="cart__container--prince">
                  <button
                    onClick={() => dispatch(deleteProduct(item))}
                    className="cart__delete"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6 svg1"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                      />
                    </svg>
                  </button>
                  <Typography level="h5" textColor="inherit">
                    ${item.product?.price}
                  </Typography>
                </div>
              </div>
            ))}
          </main>
          <footer className="footer__contianer">
            <strong className="footer__total">
              Total: {totalPrice.toFixed(2)}$
            </strong>
            <div onClick={() => dispatch(buyCartThunk())} className="button">
              <div className="button-wrapper">
                <div className="text">Buy Now</div>
                <span className="icon">
                  <svg
                    viewBox="0 0 16 16"
                    className="bi bi-cart2"
                    fill="currentColor"
                    height="16"
                    width="16"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l1.25 5h8.22l1.25-5H3.14zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z"></path>
                  </svg>
                </span>
              </div>
            </div>
          </footer>
        </Sheet>
      </Modal>
    </React.Fragment>
  )
}
