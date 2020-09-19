import React from "react"
import { css } from "@emotion/core"
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io"
import { AiOutlineMinus } from "react-icons/ai"

import { SimpleText } from "../titles"

import { breakpoints, colors } from "../../styles/theme"

interface Props {
  text: string
  background?: string
  textColor?: string
  justify?: number
  withBorder?: boolean
  withIcon?: number
}

const TextContainer = ({
  text,
  justify,
  background,
  textColor,
  withBorder,
  withIcon,
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

        padding: 8px 4px;

        @media (max-width: ${breakpoints.sm}) {
          padding: 8px 2px;
        }
      `}
    >
      <SimpleText text={text} color={textColor} />
      {typeof withIcon == "number" && (
        <div
          css={css`
            margin-left: 4px;
          `}
        >
          {withIcon === 0 && <AiOutlineMinus color={textColor} size={16} />}
          {withIcon < 0 && <IoMdArrowDropdown color={textColor} size={16} />}
          {withIcon > 0 && <IoMdArrowDropup color={textColor} size={16} />}
        </div>
      )}
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
