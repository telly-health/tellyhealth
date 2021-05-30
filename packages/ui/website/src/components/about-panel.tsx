import React from "react"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import AccessibilityNewIcon from "@material-ui/icons/AccessibilityNew"
import { Link } from "gatsby"
import Image from "./image"
import Hidden from "@material-ui/core/Hidden"
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
            <Image alt="Medical practitoner" filename="doctors.webp" />
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
          We are here to help
        </Typography>
        <Bar />
        <Typography
          variant="subtitle1"
          style={{ marginBottom: 0, marginTop: 20 }}
        >
          We want to make healthcare accessible to everyone from comfort of your home. We provide services 
        </Typography>
        <Typography
          variant="h6"
          color="primary"
          style={{ fontWeight: "lighter", marginTop: 10 }}
        >
          General Medical
        </Typography>
        <Typography
          variant="h6"
          color="primary"
          style={{ fontWeight: "lighter" }}
        >
          Mental Health
        </Typography>
        <Typography
          variant="h6"
          color="primary"
          style={{ fontWeight: "lighter" }}
        >
          Specialists & Expert Advice
        </Typography>
        <Typography
          variant="h6"
          color="primary"
          style={{ fontWeight: "lighter", marginBottom: 30 }}
        >
          Wellness Care
        </Typography>
      </Grid>
    </Grid>
  )
}
export default AboutPanel
