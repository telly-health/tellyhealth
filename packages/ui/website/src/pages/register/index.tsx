import React, { useEffect, useState } from "react"
import { Formik, Form } from "formik"
import * as yup from "yup"
import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"
import Autocomplete from "@material-ui/lab/Autocomplete"
import ThemeProvider from "@material-ui/styles/ThemeProvider"
import Paper from "@material-ui/core/Paper"
import Typography from "@material-ui/core/Typography"
import MenuItem from "@material-ui/core/MenuItem"
import MuiAlert from "@material-ui/lab/Alert"
import Backdrop from "@material-ui/core/Backdrop"
import CircularProgress from "@material-ui/core/CircularProgress"
import PhoneInput from "react-phone-input-2"
import { makeStyles } from "@material-ui/core/styles"
import Recaptcha from "react-recaptcha"
import axios from "axios"
import theme from "../../theme"
import { map } from "lodash"

import Layout from "../../components/layout"
import SEO from "../../components/seo"

import specializations from "../../data/specializations"
import allLanguages from "../../data/languages"
import countries from "../../data/countries"
import errorCodes from "../../data/error-codes"

import "react-phone-input-2/lib/style.css"
import "./style.css"

const useStyles = makeStyles(theme => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}))

// ISO 3166-1 alpha-2
// ⚠️ No support for IE 11
function countryToFlag(isoCode: string) {
  return typeof String.fromCodePoint !== "undefined"
    ? isoCode
        .toUpperCase()
        .replace(/./g, char =>
          String.fromCodePoint(char.charCodeAt(0) + 127397)
        )
    : isoCode
}

const interests = [
  {
    id: "webinar",
    title: "Webinar Consultation",
  },
  {
    id: "group",
    title: "Group Consultation",
  },
  {
    id: "one-to-one",
    title: "One-to-One Consultation",
  },
]

const siteKey = process.env.RECAPTCHA_SITE_KEY
const apiBaseUrl = process.env.CORE_API_BASE_URL

const validationSchema = yup
  .object({
    name: yup.string().required("Fullname is required"),
    email: yup
      .string()
      .email("Enter a valid email")
      .required("Email is required"),
    specialization: yup.string().required("Specialization is required"),
  })
  .shape({
    country: yup.string().required("Country is required"),
    recaptcha: yup.string().required(),
    languages: yup.array().of(yup.string()).required("Languages is required"),
    phoneNumber: yup.string().required("Phone number is required"),
  })

const RegisterClinician = () => {
  const initialValues = {
    name: "",
    email: "",
    phoneNumber: "",
    country: "",
    specialization: "",
    languages: [],
    recaptcha: "",
    preferredConsultation: [],
  }
  const classes = useStyles()
  const [loading, setLoading] = useState(false)
  const [response, setResponse] = useState(null as any)

  const onSubmit = async (values: any, { resetForm }) => {
    setLoading(true)
    try {
      const result: any = await axios({
        method: "post",
        baseURL: apiBaseUrl,
        url: "/user/register/medical_practitoner",
        data: {
          ...values,
          location: "",
          timezone: "",
        },
      })
      const data = result.data
      if (data.user) {
        setResponse({
          type: "success",
          message:
            "Thanks for registering. Our team will reach out to you shortly.",
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
    } catch (err) {
      setResponse({
        type: "error",
        message: "Registration failed. Please try again.",
      })
      setLoading(false)
    }
  }

  useEffect(() => {
    const script = document.createElement("script")
    script.src = "https://www.google.com/recaptcha/api.js"
    script.async = true
    script.defer = true
    document.body.appendChild(script)
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
        <SEO title="Register clinician" />
        <Paper className={`register-form`} elevation={3}>
          <Typography variant="h5" className={`title`}>
            Register GP/Specialist
          </Typography>
          {previewResponse()}
          <Formik
            validationSchema={validationSchema}
            initialValues={initialValues}
            onSubmit={onSubmit}
          >
            {({ handleChange, values, errors, touched, setFieldValue }) => (
              <Form>
                <TextField
                  fullWidth
                  className="textfield"
                  id="name"
                  name="name"
                  label="Full Name"
                  autoComplete="new-password"
                  variant="filled"
                  value={values.name}
                  onChange={handleChange}
                  error={touched.name && Boolean(errors.name)}
                  helperText={touched.name && errors.name}
                />
                <TextField
                  fullWidth
                  className="textfield"
                  autoComplete="new-password"
                  id="email"
                  name="email"
                  label="Email"
                  variant="filled"
                  value={values.email}
                  onChange={handleChange}
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                />
                <div className="MuiFormControl-root MuiTextField-root textfield MuiFormControl-fullWidth">
                  <PhoneInput
                    variant="filled"
                    autoComplete="new-password"
                    country={"us"}
                    value={values.phoneNumber}
                    error={touched.phoneNumber && Boolean(errors.phoneNumber)}
                    helperText={touched.phoneNumber && errors.phoneNumber}
                    onChange={phone => {
                      setFieldValue("phoneNumber", `+${phone}`)
                    }}
                  />
                </div>
                <Autocomplete
                  id="country-select"
                  options={countries}
                  autoHighlight
                  className="textfield"
                  getOptionLabel={option => option.label}
                  renderOption={option => (
                    <React.Fragment>
                      <span>{countryToFlag(option.code)}</span>
                      {option.label}
                    </React.Fragment>
                  )}
                  onChange={(e, value) => {
                    setFieldValue(
                      "country",
                      value !== null ? value.code : initialValues.country
                    )
                  }}
                  renderInput={params => (
                    <TextField
                      {...params}
                      fullWidth
                      label="Choose country you live in"
                      variant="filled"
                      autoComplete="off"
                      inputProps={{
                        ...params.inputProps,
                      }}
                      value={values.country}
                      error={touched.country && Boolean(errors.country)}
                      helperText={touched.country && errors.country}
                    />
                  )}
                />
                <TextField
                  fullWidth
                  className="textfield"
                  name="specialization"
                  id="specialization"
                  variant="filled"
                  autoComplete="new-password"
                  select
                  label="Choose your specialization"
                  value={values.specialization}
                  onChange={handleChange}
                  error={
                    touched.specialization && Boolean(errors.specialization)
                  }
                  helperText={touched.specialization && errors.specialization}
                >
                  {specializations.map(option => (
                    <MenuItem key={option.id} value={option.id}>
                      {option.name}
                    </MenuItem>
                  ))}
                </TextField>
                <Autocomplete
                  multiple
                  id="languages"
                  options={allLanguages}
                  getOptionLabel={option => option.name}
                  defaultValue={[]}
                  onChange={(e, value) => {
                    const languages = map(value, option => {
                      return option.id
                    })
                    setFieldValue(
                      "languages",
                      value !== null ? languages : initialValues.languages
                    )
                  }}
                  renderInput={params => (
                    <TextField
                      {...params}
                      variant="filled"
                      autoComplete="new-password"
                      label="Known languages"
                      className="textfield"
                      placeholder="Choose"
                      helperText={touched.languages && errors.languages}
                    />
                  )}
                />
                <Autocomplete
                  multiple
                  id="preferred-consultation"
                  options={interests}
                  getOptionLabel={option => option.title}
                  defaultValue={[]}
                  onChange={(e, value) => {
                    const preferredConsultation = value || []

                    setFieldValue(
                      "preferredConsultation",
                      value !== null
                        ? preferredConsultation.map(
                            consultation => consultation.id
                          )
                        : initialValues.preferredConsultation
                    )
                  }}
                  renderInput={params => (
                    <TextField
                      {...params}
                      variant="filled"
                      className="textfield"
                      label="Preferred consultation"
                      placeholder="Choose"
                    />
                  )}
                />
                <Recaptcha
                  sitekey={siteKey}
                  render="explicit"
                  verifyCallback={(response: any) => {
                    setFieldValue("recaptcha", response)
                  }}
                  onloadCallback={() => {
                    console.log("done loading!")
                  }}
                />
                <Button
                  size="large"
                  className="submit"
                  color="primary"
                  variant="contained"
                  fullWidth
                  type="submit"
                >
                  Submit
                </Button>
              </Form>
            )}
          </Formik>
          <Backdrop className={classes.backdrop} open={loading}>
            <span style={{ position: "relative", top: "43px", left: "68px" }}>
              Registering...
            </span>
            <CircularProgress color="inherit" />
          </Backdrop>
        </Paper>
      </Layout>
    </ThemeProvider>
  )
}

export default RegisterClinician
