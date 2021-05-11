import React from "react"
import Paragraph from "./paragraph"
import Blockquote from "./blockquote"

export default {
  p: props => <Paragraph {...props} />,
  blockquote: props => <Blockquote {...props} />,
}
