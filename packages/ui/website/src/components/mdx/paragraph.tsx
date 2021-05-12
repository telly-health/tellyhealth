import React from "react"
import Typography from "@material-ui/core/Typography"

export default ({ children }) => (
  <Typography
    variant="body1"
    style={{ lineHeight: "1.7", maxWidth: "750px", margin: "20px auto" }}
  >
    {children}
  </Typography>
)
