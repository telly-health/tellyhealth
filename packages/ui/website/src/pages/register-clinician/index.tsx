import React from "react"
import { useFormik } from "formik"
import * as yup from "yup"
import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"
import ThemeProvider from "@material-ui/styles/ThemeProvider"
import Paper from "@material-ui/core/Paper"
import Typography from "@material-ui/core/Typography"
import theme from "../../theme"

import Layout from "../../components/layout"
import SEO from "../../components/seo"

import "./style.css"

const validationSchema = yup.object({
  name: yup
    .string("Enter your fullname")
    .required("Fullname is required"),
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  mobile: yup
    .string("Enter your mobile number")
    .min(8, "Mobile should be of minimum 8 characters length")
    .required("Mobile number is required"),
  location: yup
    .string("Enter your location")
    .required("Location is required"),
})

const RegisterClinician = () => {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      mobile: "",
      location: "",
    },
    validationSchema: validationSchema,
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2))
    },
  })

  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <SEO title="Register clinician" />
        <Paper className={`register-form`} elevation={3}>
          <Typography variant="h5" className={`title`}>Register Clinician</Typography>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              fullWidth
              className="textfield"
              id="name"
              name="name"
              label="Full Name"
              variant="filled"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
            <TextField
              fullWidth
              className="textfield"
              id="email"
              name="email"
              label="Email"
              variant="filled"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              fullWidth
              className="textfield"
              id="mobile"
              name="mobile"
              label="Mobile"
              type="mobile"
              variant="filled"
              value={formik.values.mobile}
              onChange={formik.handleChange}
              error={formik.touched.mobile && Boolean(formik.errors.mobile)}
              helperText={formik.touched.mobile && formik.errors.mobile}
            />
            <TextField
              fullWidth
              className="textfield"
              id="location"
              name="location"
              label="Location"
              type="textfield"
              variant="filled"
              value={formik.values.location}
              onChange={formik.handleChange}
              error={formik.touched.location && Boolean(formik.errors.location)}
              helperText={formik.touched.location && formik.errors.location}
            />
            <Button size="large" className="submit" color="primary" variant="contained" fullWidth type="submit">
              Submit
            </Button>
          </form>
        </Paper>
      </Layout>
    </ThemeProvider>
  )
}

export default RegisterClinician
