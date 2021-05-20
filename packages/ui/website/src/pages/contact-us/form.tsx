import React from "react"

import { Formik, Form } from "formik"
import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"
import Autocomplete from "@material-ui/lab/Autocomplete"
import PhoneInput from "react-phone-input-2"
import Recaptcha from "react-recaptcha"
import { lowerCase, get } from "lodash"

import countries from "../../data/countries"
import { Contact } from "../../data/types"

// ISO 3166-1 alpha-2
// ⚠️ No support for IE 11
const countryToFlag = (isoCode: string) => {
  return typeof String.fromCodePoint !== "undefined"
    ? isoCode
        .toUpperCase()
        .replace(/./g, char =>
          String.fromCodePoint(char.charCodeAt(0) + 127397)
        )
    : isoCode
}

const siteKey = process.env.GATSBY_RECAPTCHA_SITE_KEY

const ContactForm = ({ validationSchema, initialValues, onSubmit }) => (
  <Formik
    validationSchema={validationSchema}
    initialValues={initialValues as Contact}
    enableReinitialize={true}
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
          value={get(values, "name", "")}
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
          value={get(values, "email", "")}
          onChange={handleChange}
          error={touched.email && Boolean(errors.email)}
          helperText={touched.email && errors.email}
        />
        <div className="MuiFormControl-root MuiTextField-root textfield MuiFormControl-fullWidth">
          <PhoneInput
            country={lowerCase(get(values, "country.code", "in"))}
            value={get(values, "phoneNumber", "")}
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
          value={get(values, "country", {
            code: "in",
            label: "India",
          })}
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
              error={touched.country && Boolean(errors.country)}
              helperText={touched.country && errors.country}
            />
          )}
        />
        <TextField
          fullWidth
          multiline
          className="textfield"
          rows={4}
          id="message"
          name="message"
          label="Enquiry message"
          variant="filled"
          value={get(values, "message", "")}
          onChange={handleChange}
          error={touched.message && Boolean(errors.message)}
          helperText={touched.message && errors.message}
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
          Send Message
        </Button>
      </Form>
    )}
  </Formik>
)

export default ContactForm
