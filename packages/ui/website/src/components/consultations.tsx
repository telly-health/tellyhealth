import React from "react"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import ConsultationCard from "./consultation-card"
import Bar from "./bar"

const Services = () => {
  let services = [
    {
      id: 1,
      image:
        "data:image/jpeg;base64,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",
      title: "Dr. Palaniappan Manickam",
      description: "What everyone should do when they get COVID symptoms?",
      time: "09:AM IST",
      location: "California",
      slots: "20/100",
    },
    {
      id: 1,
      image: "https://www.stockvault.net/data/2015/09/01/177580/preview16.jpg",
      title: "Dr. Paul McFord",
      description: "What everyone should do when they get COVID symptoms?",
      time: "11:AM IST",
      location: "Sydney",
      slots: "8/10",
    },
  ]

  return (
    <Grid
      container
      spacing={3}
      style={{
        textAlign: "center",
        minHeight: 200,
        padding: 10,
      }}
    >
      <Grid
        item
        xs={12}
        container
        direction="column"
        justify="center"
        alignItems="center"
      >
        <Typography variant="h5">Open Consultations</Typography>
        <Bar />
        <Typography variant="subtitle1" style={{ margin: 30 }}>
          Countries across Asia Pacific are reeling from surges from corona
          viruses cases, this as overburdened health care professionals. Open
          consultations are created by medical practitioners across the globe to
          support people in time of crisis.
        </Typography>
      </Grid>

      {services.map(service => (
        <Grid item xs={12} sm={4} key={service.id}>
          <ConsultationCard service={service} />
        </Grid>
      ))}

      <Grid item xs={12}>
        <Button variant="outlined" color="primary" size="large">
          All Available Open Consultations
        </Button>
      </Grid>
    </Grid>
  )
}
export default Services
