import React from "react"

export default ({ children }) => (
  <blockquote
    style={{
      borderLeft: "4px solid #DDD",
      padding: "0 15px",
      marginInlineStart: "auto",
      marginInlineEnd: "auto",
    }}
  >
    {children}
  </blockquote>
)
