import React from "react"
import { css } from "@emotion/core"

import { CardTitle, SimpleText } from "../titles"

import { cardStyle, normalTextStyle } from "../../styles/styles"
import { breakpoints } from "../../styles/theme"

interface Props {
  title: string
}

const SmallCard = ({ title }: Props) => {
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
      <div
        css={css`
          display: grid;
          grid-template-columns: repeat(4, 1fr);
        `}
      >
        <div
          css={css`
            display: grid;
            grid-template-rows: repeat(5, 1fr);
          `}
        >
          <div
            css={css`
              display: flex;
              align-items: center;
              justify-content: flex-start;
              ${normalTextStyle}
            `}
          >
            <SimpleText text="Összesen"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default SmallCard
