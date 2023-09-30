import Carousel from "react-material-ui-carousel"
import { Paper } from "@mui/material"
import "../styles/Gallery.css"
import  { DefaultSettingsT } from "../utils/GallerySettings"

const SecondExample = ({ product }) => {
  const items = product?.images?.map((image) => {
    return image.url
  })
  console.log(product);
  return (
    <div
      className="gallery__container"
    >
      <Carousel  className="SecondExample" {...DefaultSettingsT}>
        {items?.map((item, index) => (
          
          <Paper
            key={index}
            className="Project"
            style={{
              backgroundColor: item.color
            }}
          >
            <img src={item} className="gallery__img" alt="image" />
          </Paper>
        ))}
      </Carousel>
    </div>
  )
}

export default SecondExample
