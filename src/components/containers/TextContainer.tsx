import React from "react"
import { css } from "@emotion/core"

import { SimpleText } from "../titles"

import { breakpoints, colors } from "../../styles/theme"

interface Props {
  text: string | number
  indicator?: string
  background?: string
  textColor?: string
  justify?: number
  withBorder?: boolean
  justifyIfSmall?: boolean
}

const TextContainer = ({
  text,
  justify,
  background,
  textColor,
  withBorder,
  justifyIfSmall,
  indicator
}: Props) => {
  return (
    <div
      css={css`
        position: relative;

        display: flex;
        align-items: center;
        justify-content: ${justify ? "flex-start" : "flex-end"};

        background: ${background};
        border-radius: 4px;

        padding: 5px 8px;
        margin: 8px 0px;
        border: 1px solid ${colors.light.primary};

        @media (max-width: ${breakpoints.sm}) {
          padding: 5px 4px;
          margin: 4px 0px;
          justify-content: ${justifyIfSmall && "flex-start"};
        }
      `}
    >
      {indicator && (
        <span
          css={css`
            position: absolute;
            bottom: 30%;
            left: 4px;
            border-radius: 100%;
            width: 12px;
            height: 12px;
            background-color: ${indicator};

          `}
        />
      )}
      <SimpleText text={text} color={textColor} />
      {withBorder && (
        <span
          css={css`
            position: absolute;
            bottom: -1px;
            border-radius: 100%;
            width: 100%;
            height: 1px;
            background-color: ${colors.dark.primary};

            left: 1px;
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
