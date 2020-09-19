import React from "react"
import { css } from "@emotion/core"

import { breakpoints } from "../../styles/theme"

const TitleContainer: React.FC = ({ children }) => {
  return (
    <div
      css={css`
        place-self: stretch;
        display: grid;
        grid-template-columns: max-content 1fr;

        @media (max-width: ${breakpoints.sm}) {
          grid-template-columns: 1fr;
          grid-template-rows: 40px 30px;
        }
      `}
    >
      {children}
    </div>
  )
}

export default TitleContainer
