import React from "react"
import { css } from "@emotion/core"

import { breakpoints } from "../../styles/theme"

interface Props {
  columns: number
}

const TableContainer: React.FC<Props>  = ({children, columns}) => {
  return (
    <div
      css={css`
        display: grid;
        grid-template-columns: repeat(${columns}, 1fr);
        grid-column-gap: 16px;

        @media (max-width: ${breakpoints.md}) {
          grid-column-gap: 8px;
        }

        @media (max-width: ${breakpoints.sm}) {
          grid-column-gap: 4px;
        }
      `}
    >
      {children}
    </div>
  )
}

export default TableContainer
