import React from "react"

import { Formik, Form } from "formik"
import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"
import Autocomplete from "@material-ui/lab/Autocomplete"
import MenuItem from "@material-ui/core/MenuItem"
import PhoneInput from "react-phone-input-2"
import Recaptcha from "react-recaptcha"
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers"
import DateFnsUtils from "@date-io/date-fns"
import { map, lowerCase, get } from "lodash"
import { Individual } from "../../data/types"

import specializations from "../../data/specializations"
import allLanguages from "../../data/languages"
import countries from "../../data/countries"

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

const siteKey = process.env.GATSBY_RECAPTCHA_SITE_KEY

const PatientRegisterForm = ({ validationSchema, initialValues, onSubmit }) => (
  <Formik
    validationSchema={validationSchema}
    initialValues={initialValues as Individual}
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
              value !== null ? value : initialValues.country
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
          className="textfield"
          name="preferredSpecialist"
          id="preferredSpecialist"
          variant="filled"
          autoComplete="new-password"
          select
          label="Choose specialist"
          value={get(values, "preferredSpecialist", "")}
          onChange={handleChange}
          error={
            touched.preferredSpecialist && Boolean(errors.preferredSpecialist)
          }
          helperText={touched.preferredSpecialist && errors.preferredSpecialist}
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
                ? preferredConsultation.map(consultation => consultation.id)
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
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            id="date"
            label="Preferred consultation date (dd/mm/yyyy)"
            inputVariant="filled"
            format="dd/MM/yyyy"
            value={get(values, "preferredConsultationDate", "")}
            onChange={value =>
              setFieldValue("preferredConsultationDate", value)
            }
            KeyboardButtonProps={{
              "aria-label": "consultation date",
            }}
          />
        </MuiPickersUtilsProvider>
        <TextField
          fullWidth
          multiline
          className="textfield"
          rows={4}
          id="additionalMessage"
          name="additionalMessage"
          label="Additional consultation message"
          variant="filled"
          value={get(values, "additionalMessage", "")}
          onChange={handleChange}
          error={touched.additionalMessage && Boolean(errors.additionalMessage)}
          helperText={touched.additionalMessage && errors.additionalMessage}
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
          Register
        </Button>
      </Form>
    )}
  </Formik>
)

export default PatientRegisterForm
