import React from "react"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import Image from "./image"
import Hidden from "@material-ui/core/Hidden"
import { Link } from "gatsby"
import Bar from "./bar"

const AboutPanel = () => {
  return (
    <Grid container spacing={3} style={{ minHeight: 500 }}>
      <Hidden xsDown>
        <Grid
          item={true}
          sm={6}
          container
          direction="column"
          justify="center"
          alignItems="flex-start"
          style={{ padding: 10 }}
        >
          <div style={{ width: "100%" }}>
            <Image alt="how it works" filename="how-it-works.png" />
          </div>
        </Grid>
      </Hidden>
      <Grid
        item={true}
        xs={12}
        sm={6}
        container
        direction="column"
        justify="center"
        alignItems="flex-start"
        style={{ paddingLeft: 40, paddingRight: 40 }}
      >
        <Typography variant="h4" color="inherit">
          Global healthcare support
        </Typography>
        <Bar />
        <Typography
          variant="subtitle1"
          style={{ marginBottom: 30, marginTop: 20 }}
        >
          Connecting people to medical practitioners across the globe through telehealth
          consultations.
        </Typography>
        <Link to={`/how-it-works`} style={{ textDecoration: 'none', color: 'inherit' }}>
          <Button variant="outlined" color="primary" size="large">
            Learn More
          </Button>
        </Link>
      </Grid>
    </Grid>
  )
}
export default AboutPanel
