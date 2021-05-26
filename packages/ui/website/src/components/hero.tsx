import React from "react"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { Link } from "gatsby"

interface Props {
  fullwidth: boolean
}

const Hero = ({fullwidth}: Props) => {
  return (
    <Grid container spacing={3} style={{ minHeight: 500, marginBottom: 30 }} className="bg-cover-main bg-filter">
      <Grid
        item={true}
        xs={12}
        sm={6}
        container
        direction="column"
        justify="center"
        alignItems="flex-end"
        style={{ paddingLeft: 40, paddingRight: 40 }}
        className="bg-non-blurred"
      >
        <div style={{ padding: 30, backdropFilter: "blur(20px)" }}>
          <Typography variant="h3" style={{ color: "#fff", fontWeight: "bold", marginBottom: 10 }}>
            Virtual Care for All
          </Typography>

          <Typography variant="subtitle1" color="inherit" style={{ color: "#fefefe", paddingLeft: 5 }}>
            Connect to a doctor, therapist, or medical expert
          </Typography>
          <Typography variant="subtitle1" color="inherit" style={{ color: "#fefefe", paddingLeft: 5, marginBottom: 30 }}>
            anywhere you are by phone or video.
          </Typography>
          <Link to="/i-am-a-patient">
            <Button variant="contained" color="primary" size="large">
              Get Started Now
            </Button>
          </Link>
          <Link to="/how-it-works">
            <Button variant="text" style={{ color: "#fff" }} size="large" endIcon={<ArrowForwardIcon />}>
              Learn More
            </Button>
          </Link>
        </div>
      </Grid>
    </Grid>
  )
}
export default Hero
