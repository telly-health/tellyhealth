import React from "react"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import CardActions from "@material-ui/core/CardActions"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import Image from "./image"

interface IProps {
  service: Service
}

interface Service {
  title: string
  image: string
  description: string
  time: string
  location: string
  slots: string
  type: string
}

const ServiceCard = ({ service, ...props }: IProps) => {
  return (
    <Card variant="outlined">
      <CardContent style={{ textAlign: "start", minHeight: 200 }}>
        <div style={{ width: 150, padding: 10, margin: "0 auto" }}>
          <Image alt={service.title} url={service.image} />
        </div>
        <Typography variant="h6" color="inherit">
          {service.title}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {service.description}
        </Typography>
        <Typography variant="subtitle1" color="inherit">
          <b>Consultation:</b> {service.type}
        </Typography>
        <Typography variant="subtitle1" color="inherit">
          <b>Time:</b> {service.time}
        </Typography>
        <Typography variant="subtitle1" color="inherit">
          <b>Location:</b> {service.location}
        </Typography>
        <Typography variant="subtitle1" color="inherit">
          <b>Available Slots:</b> {service.slots}
        </Typography>

        <CardActions>
          <Button variant="contained" color="primary" style={{ width: "100%" }}>
            Book
          </Button>
        </CardActions>
      </CardContent>
    </Card>
  )
}
export default ServiceCard
