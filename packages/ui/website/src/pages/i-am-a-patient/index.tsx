import React, { useEffect, useState } from "react"
import * as yup from "yup"
import ThemeProvider from "@material-ui/styles/ThemeProvider"
import Paper from "@material-ui/core/Paper"
import Typography from "@material-ui/core/Typography"
import Skeleton from "@material-ui/lab/Skeleton"
import Divider from "@material-ui/core/Divider"
import MuiAlert from "@material-ui/lab/Alert"
import { makeStyles } from "@material-ui/core/styles"
import Backdrop from "@material-ui/core/Backdrop"
import CircularProgress from "@material-ui/core/CircularProgress"
import axios from "axios"
import theme from "../../theme"
import Form from "./form"

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
const apiBaseUrl = process.env.CORE_API_BASE_URL

const validationSchema = yup
  .object({
    name: yup.string().required("Fullname is required"),
    email: yup
      .string()
      .email("Enter a valid email")
      .required("Email is required"),
    phoneNumber: yup
      .string()
      .min(8, "Phone should be of minimum 8 characters length")
      .required("Phone number is required"),
  })
  .shape({
    date: yup.date().nullable(),
    country: yup.object().required("Country is required"),
    recaptcha: yup.string().required(),
    languages: yup.array().of(yup.string()).required("Languages is required"),
  })

const RegisterClinician = () => {
  const classes = useStyles()
  const [loading, setLoading] = useState(false)
  const [response, setResponse] = useState(null as any)
  const [formValues, setFormValues] = useState(null as any)
  const [location, setLocation] = useState({} as any)

  // Get geolocation
  const getLocation = async () => {
    const initialValues = {
      name: "",
      email: "",
      phoneNumber: "",
      country: {
        code: "IN",
        label: "India",
      },
      preferredSpecialist: "",
      languages: [],
      recaptcha: "",
      preferredConsultation: [],
      additionalMessage: "",
      preferredConsultationDate: new Date(),
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
        url: "/user/register/individual",
        data: {
          ...values,
          location: location.lat && `${location.lat},${location.lon}` || "",
          country: values.country.code,
          timezone: "",
        },
      })
      const data = result.data
      if (data.user) {
        setResponse({
          type: "success",
          message:
            "Thanks for registering. Our team will reach out to you shortly with available consultations.",
        })
        resetForm({})
      } else {
        const errorCode: string = data.code as string
        // @ts-expect-error: Let's ignore a compile error
        const errorMessage = errorCodes[errorCode] || "Please try again."
        setResponse({
          type: "error",
          message: `Registration failed. ${errorMessage}`,
        })
      }
      setLoading(false)
      window.scrollTo(0, 0)
    } catch (err) {
      setResponse({
        type: "error",
        message: "Registration failed. Please try again.",
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
        <SEO title="Patient registration form" />
        <Paper className={`patient-form`} elevation={3}>
          <Typography variant="h6" className={`title`}>
            Patient Registration Form
          </Typography>
          <Divider style={{ marginBottom: "10px" }} />
          {previewResponse()}
          {formValues ? (
            <Form
              initialValues={formValues}
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
              Registering patient...
            </span>
            <CircularProgress color="inherit" />
          </Backdrop>
        </Paper>
      </Layout>
    </ThemeProvider>
  )
}

export default RegisterClinician
