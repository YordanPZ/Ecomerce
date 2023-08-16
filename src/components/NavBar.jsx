import { useNavigate } from "react-router-dom"
import * as React from "react"
import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import Toolbar from "@mui/material/Toolbar"
import IconButton from "@mui/material/IconButton"
import Typography from "@mui/material/Typography"
import Menu from "@mui/material/Menu"
import MenuIcon from "@mui/icons-material/Menu"
import Container from "@mui/material/Container"
import Button from "@mui/material/Button"
import Tooltip from "@mui/material/Tooltip"
import MenuItem from "@mui/material/MenuItem"
import { Link } from "react-router-dom"
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined"
import Cart from "./Cart"
import { getCartThunk } from "../store/slices/cartSlice"
import { useDispatch } from "react-redux"
import { toast } from "sonner"

const pages = ["Products", "Purchases"]
const url = ["/", "/purchases"]

function NavBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null)
  const token = localStorage.getItem("token")
  const isLoged = token?.length > 1
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const status = isLoged ? "LogOut" : "Login"

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget)
  }
  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const [open, setOpen] = React.useState(false)
  const handleOpen = () => {
    if (!isLoged) {
      navigate("/login")
      toast.error("Necesitas loguearte primero")
      return
    }
    setOpen(true)
    dispatch(getCartThunk())
  }
  const handleClose = () => setOpen(false)

  return (
    <>
      <AppBar position="static" color="transparent">
        <Container maxWidth="xxl">
          <Toolbar disableGutters>
            <img className="logo" src="/cart.png" height={100} alt="" />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none"
              }}
            >
              Ecommerce
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left"
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left"
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" }
                }}
              >
                {pages.map((page, index) => (
                  <MenuItem key={index}>
                    <Link to={url[index]}>
                      <Typography textAlign="center">{page}</Typography>
                    </Link>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none"
              }}
            >
              Ecomerce
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page, index) => (
                <Button
                  as={Link}
                  to={url[index]}
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page}
                </Button>
              ))}
            </Box>
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip
                style={{
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "2rem"
                }}
                title="Open settings"
              >
                <Link to="/login">
                  <Typography textAlign="center">{status}</Typography>
                </Link>
                <IconButton sx={{ p: 0, opacity: "1", color: "#fff" }}>
                  <ShoppingCartOutlinedIcon onClick={handleOpen} />
                </IconButton>
              </Tooltip>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Cart open={open} handleClose={handleClose} setOpen={setOpen} />
    </>
  )
}
export default NavBar
