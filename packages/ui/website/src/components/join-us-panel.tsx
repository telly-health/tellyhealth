import React from "react"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import ChatIcon from '@material-ui/icons/Chat'
import { Link } from "gatsby"
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
          TellyBot provides tips to get care, answers, and advice faster:
        </Typography>
        <Bar />
        <Typography
          variant="subtitle1"
          style={{ marginBottom: 30, marginTop: 20 }}
        >
          Our TellyBot is a health assistant will provide general advice, book appointment and connect you to the medical practitioners based on your specific needs.
        </Typography>
        <Link
          to={`/register`}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <Button
            variant="outlined"
            color="primary"
            size="large"
            endIcon={<ChatIcon />}
          >
            Chat with TellyBot
          </Button>
        </Link>
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
          <div style={{width: "100%"}}>
            <img style={{display: "table", margin: "0 auto"}} alt="Medical practitoner" src="/healthai_shot_1.gif" />
          </div>
        </Grid>
      </Hidden>
    </Grid>
  )
}
export default JoinUsPanel
