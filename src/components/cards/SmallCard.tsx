import React from "react"
import { css } from "@emotion/core"

import { CardTitle } from "../titles"

import { cardStyle } from "../../styles/styles"
import { breakpoints } from "../../styles/theme"

interface Props {
  title: string
  withMargin?: boolean
}

const SmallCard: React.FC<Props> = ({ title, children }) => {
  return (
    <div
      css={css`
        ${cardStyle}

        @media (max-width: ${breakpoints.sm}) {
          width: 100%;
        }
      `}
    >
      <CardTitle title={title} />
      {children}
    </div>
  )
}

export default SmallCard
