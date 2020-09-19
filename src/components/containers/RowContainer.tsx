import React from "react"

import { css } from "@emotion/core"

import { breakpoints } from "../../styles/theme"

const RowContainer: React.FC = ({ children }) => {
  return (
    <div
      css={css`
        display: grid;
        grid-template-columns: 1fr max-content;
        grid-column-gap: 48px;

        @media (max-width: ${breakpoints.lg}) {
          grid-column-gap: 40px;
        }

        @media (max-width: ${breakpoints.md}) {
          grid-column-gap: 32px;
        }
      `}
    >
      {children}
    </div>
  )
}

export default RowContainer
