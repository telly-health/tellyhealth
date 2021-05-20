import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Hero from "../components/hero"
import Consultations from "../components/consultations"
import AboutPanel from "../components/about-panel"
import ThemeProvider from "@material-ui/styles/ThemeProvider"
import JoinUs from "../components/join-us-panel"
import JoinDiscord from "../components/join-discord"
import theme from "../theme"

const IndexPage = () => (
  <React.Fragment>
    <ThemeProvider theme={theme}>
      <Layout>
        <SEO
          title="TellyHealth | Home"
          description={`Connecting people to medical practitoners across the globe`}
        />
        <Hero />
        <Consultations />
        <AboutPanel />
        <JoinDiscord />
        <JoinUs />
      </Layout>
    </ThemeProvider>
  </React.Fragment>
)

export default IndexPage
