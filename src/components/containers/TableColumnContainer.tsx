import React from "react"
import { css } from "@emotion/core"


const TableColumnContainer: React.FC = ({ children }) => {
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        justify-content: space-around;
      `}
    >
      {children}
    </div>
  )
}

export default TableColumnContainer
