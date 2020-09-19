import React from "react"

import { css } from "@emotion/core"

import { cardStyle, normalTextStyle } from "../../styles/styles"
import { CardTitle } from "../titles"

interface Props {
  title: string
}

const BigCard = ({ title }: Props) => {
  return (
    <div
      css={css`
        ${cardStyle}
      `}
    >
      <CardTitle title={title} />
      <div
        css={css`
          display: grid;
          grid-template-columns: 1fr max-content;
        `}
      >

      </div>
    </div>
  )
}

export default BigCard
