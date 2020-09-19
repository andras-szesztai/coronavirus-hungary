import React from "react"
import { css } from "@emotion/core"

import { CardTitle } from "../titles"

import { cardStyle } from "../../styles/styles"
import { breakpoints, colors } from "../../styles/theme"
import {
  TableColumnContainer,
  TableContainer,
  TextContainer,
} from "../containers"

interface Props {
  title: string
  withMargin?: boolean
}

const SmallCard = ({ title, withMargin }: Props) => {
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
      <TableContainer columns={4}>
        <TableColumnContainer>
          <TextContainer text="-" textColor={colors.light.primary} />
          <TextContainer text="Összesen" />
          <TextContainer text="Elõzõ 7 nap" />
          <TextContainer text="Elõzõ 30 nap" />
          <TextContainer text="Elõzõ 90 nap" />
        </TableColumnContainer>
        <TableColumnContainer>
          <TextContainer justify={1} text="Összesen" />
          <TextContainer justify={1} text="77.5" withBorder />
          <TextContainer justify={1} text="73.3" />
          <TextContainer justify={1} text="73.2" />
          <TextContainer justify={1} text="68.5" />
        </TableColumnContainer>
        <TableColumnContainer>
          <TextContainer justify={1} text="Nõ" />
          <TextContainer justify={1} text="80.5" withBorder />
          <TextContainer justify={1} text="82.3" />
          <TextContainer justify={1} text="76.2" />
          <TextContainer justify={1} text="76.1" />
        </TableColumnContainer>
        <TableColumnContainer>
          <TextContainer justify={1} text="Férfi" />
          <TextContainer justify={1} text="70.6" withBorder />
          <TextContainer justify={1} text="82.3" />
          <TextContainer justify={1} text="76.2" />
          <TextContainer justify={1} text="76.1" />
        </TableColumnContainer>
      </TableContainer>
    </div>
  )
}

export default SmallCard
