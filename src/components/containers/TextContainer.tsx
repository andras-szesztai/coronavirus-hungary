import React from "react"
import { css } from "@emotion/core"

import { SimpleText } from "../titles"

import { breakpoints, colors } from "../../styles/theme"

interface Props {
  text: string | number
  background?: string
  textColor?: string
  justify?: number
  withBorder?: boolean
}

const TextContainer = ({
  text,
  justify,
  background,
  textColor,
  withBorder,
}: Props) => {
  return (
    <div
      css={css`
        position: relative;

        display: flex;
        align-items: center;
        justify-content: ${justify ? "flex-end" : "flex-start"};

        background: ${background};
        border-radius: 4px;

        padding: 4px 8px;
        margin: 8px 0px;

        @media (max-width: ${breakpoints.sm}) {
          padding: 4px 4px 4px 2px;
          margin: 4px 0px;
        }
      `}
    >
      <SimpleText text={text} color={textColor} />
      {withBorder && (
        <span
          css={css`
            position: absolute;
            bottom: 0px;
            border-radius: 100%;
            width: 100%;
            height: 1px;
            background-color: ${colors.dark.primary};
          `}
        />
      )}
    </div>
  )
}

TextContainer.defaultProps = {
  background: colors.light.primary,
}

export default TextContainer
