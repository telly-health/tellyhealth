import React from "react"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import Avatar from "@material-ui/core/Avatar"
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
          You are invited to join TellyHealth hub
        </Typography>
        <Bar />
        <Typography
          variant="subtitle1"
          style={{ marginBottom: 30, marginTop: 20 }}
        >
          Join our Discord server! We are building the community to share health
          related information.
        </Typography>
        <a href="https://discord.gg/T8f4qZsf" target="_blank">
          <Button
            variant="outlined"
            color="primary"
            size="large"
            endIcon={<Avatar src={"/discord.png"} />}
          >
            Join TellyHealth Hub
          </Button>
        </a>
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
            <Image alt="Join discord community" filename="join-community.png" />
          </div>
        </Grid>
      </Hidden>
    </Grid>
  )
}
export default JoinUsPanel
