import React from "react"
import { css } from "@emotion/core"

import { breakpoints } from "../../styles/theme"

const DashboardContainer: React.FC = ({ children }) => {
  return (
    <div
      css={css`
        width: 100%;
        height: 100%;
        display: grid;
        grid-template-rows: 80px 1fr;
        grid-row-gap: 40px;

        @media (max-width: ${breakpoints.lg}) {
          grid-template-rows: 70px 1fr;
          grid-row-gap: 32px;
        }

        @media (max-width: ${breakpoints.md}) {
          grid-template-rows: 55px 1fr;
          grid-row-gap: 24px;
        }

        @media (max-width: ${breakpoints.sm}) {
          grid-template-rows: 70px 1fr;
          grid-row-gap: 16px;
        }
      `}
    >
      {children}
    </div>
  )
}

export default DashboardContainer
