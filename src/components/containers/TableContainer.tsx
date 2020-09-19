import React from "react"
import { css } from "@emotion/core"

import { breakpoints } from "../../styles/theme"

interface Props {
  columns: number
  bigCard?: boolean
}

const TableContainer: React.FC<Props> = ({ children, columns, bigCard }) => {
  return (
    <div
      css={css`
        display: grid;
        grid-template-columns:
        ${
          bigCard
            ? `repeat(${columns}, 1fr)`
            : `max-content repeat(${columns - 1}, 1fr)`
        };
        grid-column-gap: 16px;

        @media (max-width: ${breakpoints.md}) {
          grid-column-gap: 12px;
        }

        @media (max-width: ${breakpoints.sm}) {
          grid-column-gap: 8px;
        }
      `}
    >
      {children}
    </div>
  )
}

export default TableContainer
