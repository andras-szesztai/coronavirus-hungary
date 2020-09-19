import React from "react"

import { css } from "@emotion/core"

import { breakpoints } from "../../styles/theme"

const ColumnContainer: React.FC = ({ children }) => {
  return (
    <div
      css={css`
        display: grid;
        grid-template-rows: repeat(2, min-content);
        grid-row-gap: 48px;

        @media (max-width: ${breakpoints.lg}) {
          grid-row-gap: 40px;
        }

        @media (max-width: ${breakpoints.md}) {
          grid-row-gap: 32px;
        }

        @media (max-width: ${breakpoints.sm}) {
          grid-template-rows: 1fr;
          grid-template-rows: repeat(2, 1fr);
          grid-row-gap: 24px;
        }
      `}
    >
      {children}
    </div>
  )
}

export default ColumnContainer
