import React from "react"
import { graphql } from "gatsby"
import { MDXProvider } from "@mdx-js/react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import ThemeProvider from "@material-ui/styles/ThemeProvider"
import { makeStyles } from "@material-ui/core/styles"
import Paper from "@material-ui/core/Paper"
import Typography from "@material-ui/core/Typography"
import Grid from "@material-ui/core/Grid"
import Divider from "@material-ui/core/Divider"
import Img from "gatsby-image"

import Layout from "./layout"
import components from "./mdx"
import theme from "./../theme"

const useStyles = makeStyles(theme => ({
  mainFeaturedPost: {
    position: "relative",
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    marginBottom: theme.spacing(4),
    // backgroundImage: "url(https://source.unsplash.com/random)",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    minHeight: 320,
  },
  overlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: "rgba(0,0,0,.3)",
  },
  mainFeaturedPostContent: {
    margin: 40,
    position: "relative",
    padding: theme.spacing(3),
    [theme.breakpoints.up("md")]: {
      padding: theme.spacing(10),
      paddingRight: 0,
    },
  },
  buttonsDiv: {
    margin: 5,
  },
  buttons: {
    marginRight: 15,
  },
}))

export default function PageTemplate({ data: { mdx } }) {
  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <div style={{ padding: "0 1rem", marginBottom: "10rem" }}>
          <Divider />
          <Grid item xs={12} md={10}>
            <Typography variant="h4" gutterBottom style={{ padding: 10 }}>
              {mdx.frontmatter.title}
            </Typography>
            <Typography
              variant="subtitle1"
              gutterBottom
              style={{ padding: 10 }}
            >
              {`${mdx.frontmatter.date} by ${mdx.frontmatter.author}`}
            </Typography>
            <Divider />
            <MDXProvider components={components}>
              <MDXRenderer>{mdx.body}</MDXRenderer>
            </MDXProvider>
          </Grid>
        </div>
      </Layout>
    </ThemeProvider>
  )
}

export const pageQuery = graphql`
  query BlogPostQuery($id: String) {
    mdx(id: { eq: $id }) {
      id
      body
      frontmatter {
        title
        date
        author
      }
    }
  }
`
