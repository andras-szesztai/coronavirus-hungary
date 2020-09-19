import React from "react"

import { css } from "@emotion/core"

import { breakpoints, fontSize, fontWeight } from "../../styles/theme"

const CardTitle = ({ title }: { title: string }) => {
  return (
    <h2
      css={css`
        font-size: ${fontSize.xs.primary};
        font-weight: ${fontWeight.lg};

        @media (max-width: ${breakpoints.sm}) {
          font-size: ${fontSize.xs.secondary};
        }

      `}
    >
      {title}
    </h2>
  )
}

export default CardTitle
