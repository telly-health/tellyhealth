import PropTypes from "prop-types"
import React from "react"

import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import { makeStyles } from "@material-ui/core/styles"
import IconButton from "@material-ui/core/IconButton"
import MenuIcon from "@material-ui/icons/Menu"
import Hidden from "@material-ui/core/Hidden"
import Drawer from "@material-ui/core/Drawer"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import List from "@material-ui/core/List"
import { Link } from "gatsby"
import Image from "./image"

interface Props {
  companyName: string
}

const useStyles = makeStyles(theme => ({
  appBar: {
    color: "#233348",
    backgroundColor: "#FFF",
    borderBottom: "1px solid #ccc",
  },
  toolbar: {
    flexWrap: "wrap",
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  drawerList: {
    width: 250,
  },
  drawerToggle: {
    padding: 20,
  },
}))

const Header = ({ companyName }: Props) => {
  const classes = useStyles()
  const [open, setOpen] = React.useState(false)

  const handleDrawerOpen = () => {
    setOpen(true)
  }
  const handleDrawerClose = () => {
    setOpen(false)
  }

  const navLinks = [
    { displayText: "Home", link: "/" },
    { displayText: "I'm a patient", link: "/i-am-a-patient" },
    { displayText: "How it works", link: "/how-it-works" },
    { displayText: "Contact", link: "/contact-us" },
  ]

  return (
    <React.Fragment>
      <AppBar
        position="static"
        elevation={0}
        className={`${classes.appBar} header`}
      >
        <Toolbar className={classes.toolbar}>
          <Hidden smUp>
            <IconButton
              className={classes.drawerToggle}
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
            >
              <MenuIcon />
            </IconButton>
          </Hidden>
          <Typography
            variant="h6"
            color="inherit"
            className={classes.toolbarTitle}
          >
            <div style={{ width: "180px" }}>
              <Link
                to={`/`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <Image
                  alt="Connecting people to medical practitioners across the globe"
                  filename="logo.png"
                />
              </Link>
            </div>
          </Typography>

          <Hidden xsDown>
            {navLinks.map(item => (
              <Link
                to={item.link}
                style={{ textDecoration: "none", color: "inherit" }}
                key={item.displayText}
              >
                <Button color="inherit">{item.displayText}</Button>
              </Link>
            ))}
          </Hidden>
          <Link
            to={`/register`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <Button variant="contained" color="primary" disableElevation>
              Register GP/Specialist
            </Button>
          </Link>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="temporary"
        anchor="left"
        open={open}
        onEscapeKeyDown={handleDrawerClose}
        onBackdropClick={handleDrawerClose}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
      >
        <List className={classes.drawerList}>
          {navLinks.map((item, index) => (
            <ListItem button key={item.displayText}>
              <ListItemText primary={item.displayText} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </React.Fragment>
  )
}

Header.propTypes = {
  companyName: PropTypes.string,
}

Header.defaultProps = {
  companyName: `TellyHealth`,
}

export default Header
