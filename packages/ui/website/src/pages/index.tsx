import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Hero from "../components/hero"
import Consultations from "../components/consultations"
import AboutPanel from "../components/about-panel"
import ThemeProvider from "@material-ui/styles/ThemeProvider"
import theme from "../theme"
import JoinUs from "../components/join-us-panel"

const IndexPage = () => (
  <React.Fragment>
    <ThemeProvider theme={theme}>
      <Layout>
        <SEO title="Home" />
        <Hero />
        <Consultations />
        <AboutPanel />
        <JoinUs />
      </Layout>
    </ThemeProvider>
  </React.Fragment>
)

export default IndexPage
