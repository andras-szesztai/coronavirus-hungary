import React from "react"

import { css } from "@emotion/core"

import { breakpoints, colors, fontSize, fontWeight } from "../../styles/theme"

const SimpleText = ({
  text,
  color,
}: {
  text: string | number
  color?: string
}) => {
  return (
    <h3
      css={css`
        font-weight: ${fontWeight.md};
        font-size: ${fontSize.xs.primary};
        color: ${color || colors.dark.primary};

        @media (max-width: ${breakpoints.sm}) {
          font-size: ${fontSize.xs.secondary};
        }
      `}
    >
      {text}
    </h3>
  )
}

export default SimpleText
