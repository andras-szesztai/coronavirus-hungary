import React from "react"
import { css } from "@emotion/core"

import { CardTitle } from "../titles"

import { cardStyle } from "../../styles/styles"
import { breakpoints } from "../../styles/theme"
import LoadingAnimation from "./Loader"

interface Props {
  title: string
  withMargin?: boolean
  isLoading: boolean
  handleClick: () => void
}

const SmallCard: React.FC<Props> = ({
  title,
  children,
  isLoading,
  handleClick,
}) => {
  return (
    <div
      css={css`
        ${cardStyle}

        @media (max-width: ${breakpoints.sm}) {
          width: 100%;
        }
      `}
    >
      <LoadingAnimation isLoading={isLoading} />
      <CardTitle handleClick={handleClick} title={title} />
      {children}
    </div>
  )
}

export default SmallCard
