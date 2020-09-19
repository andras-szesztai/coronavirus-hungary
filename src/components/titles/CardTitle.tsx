import React from "react"

import { css } from "@emotion/core"

import { breakpoints, fontSize } from "../../styles/theme"

const CardTitle = ({ title }: { title: string }) => {
  return (
    <h2
      css={css`
        font-size: ${fontSize.lg.primary};

        @media (max-width: ${breakpoints.md}) {
          font-size: ${fontSize.lg.secondary};
        }

        @media (max-width: ${breakpoints.sm}) {
          font-size: ${fontSize.lg.tertiary};
        }
      `}
    >
      {title}
    </h2>
  )
}

export default CardTitle
