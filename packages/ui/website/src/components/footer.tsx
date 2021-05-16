import React from "react"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import Box from "@material-ui/core/Box"
import Hidden from "@material-ui/core/Hidden"
import Link from "@material-ui/core/Link"
import Image from "./image"

const Footer = () => {
  const footerLinks = [
    // {
    //   title: "Company",
    //   items: [
    //     { displayText: "About", url: "" },
    //     {
    //       displayText: "Testimonials",
    //       url: "",
    //     },
    //     { displayText: "Find consultation", url: "" },
    //     { displayText: "How it works", url: "" },
    //   ],
    // },
  ]

  return (
    <React.Fragment>
      <div className="footer-wrapper">
        <Box className="footer">
          <Grid
            container
            style={{
              margin: `0 auto`,
              maxWidth: 960,
              minHeight: 250,
              color: "#FFF",
            }}
          >
            <Grid
              xs={12}
              sm={6}
              item
              container
              direction="column"
              justify="space-evenly"
              style={{ padding: 10 }}
            >
              <Typography variant="h4" color="inherit">
                <div style={{ width: "180px" }}>
                  <Image
                    alt="Connecting people to medical practitioners across the globe"
                    filename="telly.health-logo-white.png"
                  />
                </div>
              </Typography>
              <Typography variant="body1" color="inherit">
                TellyHealth is a platform for connecting people to medical
                practitioners across the globe.
              </Typography>
              <Typography variant="body2" color="inherit">
                @telly.health PTY LTD 2021. All rights reserved
              </Typography>
            </Grid>

            <Hidden xsDown>
              {footerLinks.map(footerMenu => (
                <Grid
                  item
                  xs={12}
                  sm={3}
                  container
                  direction="column"
                  justify="space-evenly"
                  key={footerMenu.title}
                >
                  <Typography variant="subtitle1" color="inherit">
                    {footerMenu.title}
                  </Typography>
                  {footerMenu.items.map(link => (
                    <Link
                      color="inherit"
                      variant="body2"
                      key={link.displayText}
                    >
                      {link.displayText}
                    </Link>
                  ))}
                </Grid>
              ))}
            </Hidden>
          </Grid>
        </Box>
        <Box className="attribution">
          <Grid
            container
            style={{
              margin: `0 auto`,
              maxWidth: 960,
              color: "#FFF",
              paddingLeft: 5,
              paddingRight: 5,
            }}
            direction="row"
            justify="space-between"
            alignItems="center"
          >
            <Typography variant="body2" color="inherit">
              Designed by
              <a href="" target="_blank" style={{ color: "#FFF", margin: 5 }}>
                telly.health
              </a>
            </Typography>
          </Grid>
        </Box>
      </div>
    </React.Fragment>
  )
}
export default Footer
