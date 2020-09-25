import React from "react"
import { css } from "@emotion/core"

import { fontSize, fontWeight, breakpoints } from "../../styles/theme"

const MainTitle = () => {
  return (
    <div
      css={css`
        place-self: stretch;
        display: grid;
        align-items: center;

        font-size: ${fontSize.xxl.primary};
        font-weight: ${fontWeight.xs};

        @media (max-width: ${breakpoints.lg}) {
          font-size: ${fontSize.xxl.secondary};
          font-weight: ${fontWeight.sm};
        }

        @media (max-width: ${breakpoints.md}) {
          font-size: ${fontSize.xxl.tertiary};
          font-weight: ${fontWeight.sm};
        }
      `}
    >
      COVID-19 Magyarországon
    </div>
  )
}

export default MainTitle
