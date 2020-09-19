import React from "react"

import { css } from "@emotion/core"

import { cardStyle } from "../../styles/styles"
import { breakpoints } from "../../styles/theme"
import { CardTitle } from "../titles"

interface Props {
  title: string
}

const SmallCard = ({ title }: Props) => {
  return (
    <div
      css={css`
        ${cardStyle}

        width: 440px;

        @media (max-width: ${breakpoints.md}) {
          width: 400px;
        }

        @media (max-width: ${breakpoints.sm}) {
          width: 360px;
        }
      `}
    >
      <CardTitle title={title} />
    </div>
  )
}

export default SmallCard
