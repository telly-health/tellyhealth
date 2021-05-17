import React, { useEffect, useState } from "react"
import * as yup from "yup"
import ThemeProvider from "@material-ui/styles/ThemeProvider"
import Skeleton from "@material-ui/lab/Skeleton"
import Paper from "@material-ui/core/Paper"
import Typography from "@material-ui/core/Typography"
import MuiAlert from "@material-ui/lab/Alert"
import Backdrop from "@material-ui/core/Backdrop"
import CircularProgress from "@material-ui/core/CircularProgress"
import Divider from "@material-ui/core/Divider"
import { makeStyles } from "@material-ui/core/styles"
import FacebookIcon from "@material-ui/icons/Facebook"
import TwitterIcon from "@material-ui/icons/Twitter"
import axios from "axios"
import theme from "../../theme"
import Form from "./form"

import { Contact } from "../../data/types"
import Layout from "../../components/layout"
import SEO from "../../components/seo"

import errorCodes from "../../data/error-codes"

import "react-phone-input-2/lib/style.css"
import "./style.css"

const useStyles = makeStyles(theme => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}))

const apiBaseUrl = process.env.GATSBY_CORE_API_BASE_URL

const validationSchema = yup
  .object({
    name: yup.string().required("Fullname is required"),
    email: yup
      .string()
      .email("Enter a valid email")
      .required("Email is required"),
  })
  .shape({
    country: yup.object().required("Country is required"),
    recaptcha: yup.string().required(),
    phoneNumber: yup.string().required("Phone number is required"),
    message: yup.string().required("Enquiry message is required"),
  })

const ContactUs = () => {
  const classes = useStyles()
  const [loading, setLoading] = useState(false)
  const [response, setResponse] = useState(null as any)
  const [formValues, setFormValues] = useState(null as any)
  const [location, setLocation] = useState({} as any)

  // Get geolocation
  const getLocation = async () => {
    const initialValues: Contact = {
      name: "",
      email: "",
      phoneNumber: "",
      country: {
        code: "IN",
        label: "India",
      },
      recaptcha: "",
      message: "",
    }
    try {
      const response = await axios.get("https://extreme-ip-lookup.com/json/")
      initialValues.country = {
        code: response.data.countryCode,
        label: response.data.country,
      }
      setFormValues(initialValues)
      setLocation(response.data)
    } catch (error) {
      setFormValues(initialValues)
      return error
    }
  }

  const onSubmit = async (values: any, { resetForm }) => {
    setLoading(true)
    try {
      const result: any = await axios({
        method: "post",
        baseURL: apiBaseUrl,
        url: "/contact/save",
        data: {
          ...values,
          country: values.country.code,
          location: (location.lat && `${location.lat},${location.lon}`) || "",
        },
      })
      const data = result.data
      if (data.id) {
        setResponse({
          type: "success",
          message:
            "Thanks for contacting us. Our team will reach out to you shortly.",
        })
        resetForm({})
      } else {
        const errorCode: string = data.code as string
        // @ts-expect-error: Let's ignore a compile error
        const errorMessage = errorCodes[errorCode] || "Please try again."
        setResponse({
          type: "error",
          message: `Contact save failed. ${errorMessage}`,
        })
      }
      setLoading(false)
      window.scrollTo(0, 0)
    } catch (err) {
      setResponse({
        type: "error",
        message: "Contact save failed. Please try again.",
      })
      setLoading(false)
      window.scrollTo(0, 0)
    }
  }

  useEffect(() => {
    const script = document.createElement("script")
    script.src = "https://www.google.com/recaptcha/api.js"
    script.async = true
    script.defer = true
    document.body.appendChild(script)
    getLocation()
  }, [])

  const previewResponse = () => {
    if (!response) {
      return ""
    }
    return (
      <MuiAlert elevation={6} variant="filled" severity={response.type}>
        {response.message}
      </MuiAlert>
    )
  }

  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <SEO title="TellyHealth - Contact us" />
        <Paper className={`contact-form`} elevation={3}>
          <Typography variant="h6" className={`title`}>
            Get in touch!
          </Typography>
          <Typography variant="subtitle1" className={`subtitle`}>
            Contact us for enquiry, help or join the team
          </Typography>
          <div className="social-wrapper">
            <a href="https://www.facebook.com/tellyhealth" target="_blank" >
              <FacebookIcon fontSize="large" style={{ color: "#4267B2" }} />
            </a>
            <a href="https://twitter.com/tellyhealth" target="_blank" >
              <TwitterIcon fontSize="large" style={{ color: "#1DA1F2" }} />
            </a>
          </div>
          <Divider style={{ marginBottom: "10px" }} />
          {previewResponse()}
          {formValues ? (
            <Form
              initialValues={formValues as Contact}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            />
          ) : (
            <div>
              <Skeleton animation="wave" />
              <Skeleton animation="wave" />
              <Skeleton animation="wave" />
              <Skeleton animation="wave" />
            </div>
          )}
          <Backdrop className={classes.backdrop} open={loading}>
            <span style={{ position: "relative", top: "43px", left: "68px" }}>
              Sending message...
            </span>
            <CircularProgress color="inherit" />
          </Backdrop>
        </Paper>
      </Layout>
    </ThemeProvider>
  )
}

export default ContactUs
