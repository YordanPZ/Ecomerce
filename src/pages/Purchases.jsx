import "../styles/Purchases.css"
import { useSelector } from "react-redux"
function Purchases() {
  const myPurchases = useSelector((state) => state.purchases)
  console.log(myPurchases)

  return (
    <main className="main__purchases">
      <h1>My Purchases</h1>
      <ul className="purchases__list">
        {myPurchases.map((purchase) => (
          <li key={purchase.id}>
            <div className="purchase__info">
              <p className="purchase__date">
                {new Date(purchase.date).toLocaleDateString()}
              </p>
              <hr className="purchase__line" />
              <div className="purchase__price-container">
                <p className="purchase__title">{purchase.title}</p>
                <p className="purchase__title">{purchase.price}</p>
                <p className="purchase__title">Cantidad:</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </main>
  )
}

export default Purchases
