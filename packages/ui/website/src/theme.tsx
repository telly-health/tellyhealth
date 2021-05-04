import { red } from "@material-ui/core/colors"
import { createMuiTheme } from "@material-ui/core/styles"

const theme = createMuiTheme({
  typography: {
    subtitle1: {
      color: "#7D7987",
    },
  },
  palette: {
    type: "light",
    primary: {
      main: "#009CDE",
    },
    error: {
      main: red.A400,
    },
    background: {
      default: "#fff",
    },
    text: {
      primary: "#000",
      secondary: "#7D7987",
      disabled: "#CCC",
      hint: "#7D7987",
    },
  },
  shape: {
    borderRadius: 20,
  },
})

export default theme
