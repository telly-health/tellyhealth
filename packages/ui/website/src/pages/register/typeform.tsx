import React from "react"

import ThemeProvider from "@material-ui/styles/ThemeProvider"
import Layout from "../../components/layout"
import SEO from "../../components/seo"
import theme from "../../theme"

const Register = () => (
  <ThemeProvider theme={theme}>
    <Layout>
      <SEO title="Register - Medical Practitioner" />
      <div className="typeform-full">
        <iframe
          width="100%"
          height="100%"
          frameborder="0"
          allow="camera; microphone; autoplay; encrypted-media;"
          src="https://form.typeform.com/to/vPR89nv5?typeform-medium=embed-snippet"
        ></iframe>
      </div>
    </Layout>
  </ThemeProvider>
)

export default Register
