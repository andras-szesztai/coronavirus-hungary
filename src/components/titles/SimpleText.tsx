import React from "react"

import { css } from "@emotion/core"

import { fontSize, fontWeight } from "../../styles/theme"

const SimpleText = ({ text }: { text: string }) => {
  return (
    <h3
      css={css`
        font-weight: ${fontWeight.md};
        font-size: ${fontSize.xs};
      `}
    >
      {text}
    </h3>
  )
}

export default SimpleText
