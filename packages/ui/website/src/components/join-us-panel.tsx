import React from "react"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import AccessibilityNewIcon from "@material-ui/icons/AccessibilityNew"
import Image from "./image"
import Hidden from "@material-ui/core/Hidden"
import Bar from "./bar"

const JoinUsPanel = () => {
  return (
    <Grid container spacing={3} style={{ minHeight: 500 }}>
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
          Global COVID-19 appeal in Asia Pacific
        </Typography>
        <Bar />
        <Typography
          variant="subtitle1"
          style={{ marginBottom: 30, marginTop: 20 }}
        >
          Countries across Asis Pacific are reeling surges in corona virus cases
          which has put stress and overburden on health care professionals. We
          are in need of medical practitioners across the globe to support and
          help impacted regions by creating free open consultations for people
          in need of medical consultation.
        </Typography>
        <Button
          variant="outlined"
          color="primary"
          size="large"
          endIcon={<AccessibilityNewIcon />}
        >
          Help us - Medical Practitioner
        </Button>
      </Grid>

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
            <Image alt="Medical practitoner" filename="doctor.jpg" />
          </div>
        </Grid>
      </Hidden>
    </Grid>
  )
}
export default JoinUsPanel
