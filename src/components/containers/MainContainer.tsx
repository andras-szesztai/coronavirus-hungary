import React from "react"
import { css } from "@emotion/core"

import { breakpoints } from "../../styles/theme"

const MainContainer: React.FC = ({ children }) => {
  return (
    <div
      css={css`
        width: 100vw;
        position: relative;
        padding: 32px 64px 48px 64px;

        @media (max-width: ${breakpoints.lg}) {
          padding: 24px 48px 32px 48px;
        }

        @media (max-width: ${breakpoints.md}) {
          padding: 16px 32px 24px 32px;
        }

        @media (max-width: ${breakpoints.sm}) {
          padding: 12px 16px 16px 16px;
        }
      `}
    >
      {children}
    </div>
  )
}

export default MainContainer
