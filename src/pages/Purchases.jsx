import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import "../styles/Purchases.css"
import { useEffect, useState } from "react"
import axios from "axios"
import getConfig from "../utils/getConfig"
import { setIsLoading } from "../store/slices/isLoadingSlice"
import { toast } from "sonner"
function Purchases() {
  const [myPurchases, setMyPurchases] = useState([])
  const token = localStorage.getItem("token")
  const isLoged = token?.length > 1
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    if (!isLoged) {
      toast.error("Necesitas loguearte primero")
      navigate("/login")
    }
    dispatch(setIsLoading(true))
    axios
      .get(
        "https://e-commerce-api-v2.academlo.tech/api/v1/purchases",
        getConfig()
      )
      .then((res) => setMyPurchases(res.data))
      .catch((err) => console.log(err))
      .finally(() => dispatch(setIsLoading(false)))

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  console.log(myPurchases)

  return (
    <main className="main__purchases">
      <h1>My Purchases</h1>
      <ul className="purchases__list">
        {myPurchases?.map((purchase) => (
          <li key={purchase.product.id}>
            <div className="purchase__info">
              <p className="purchase__date">
                {purchase.createdAt.slice(0, 10)}
              </p>
              <hr className="purchase__line" />
              <div className="purchase__price-container">
                <p className="purchase__title">{purchase.product.title}</p>
                <p className="purchase__title">{purchase.product.price}$</p>
                <p className="purchase__title">Cantidad:{purchase.quantity}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </main>
  )
}

export default Purchases
