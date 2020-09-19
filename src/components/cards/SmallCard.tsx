import React from "react"
import { css } from "@emotion/core"

import { CardTitle, SimpleText } from "../titles"

import { cardStyle } from "../../styles/styles"
import { breakpoints, colors } from "../../styles/theme"
import { TableColumnContainer, TextContainer } from "../containers"

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
          grid-column-gap: 16px;

          @media (max-width: ${breakpoints.md}) {
            grid-column-gap: 8px;
          }

          @media (max-width: ${breakpoints.sm}) {
            grid-column-gap: 4px;
          }
        `}
      >
        <TableColumnContainer>
          <TextContainer text="-" textColor={colors.light.primary} />
          <TextContainer text="Összesen" />
          <TextContainer text="Elõzõ 7 nap" />
          <TextContainer text="Elõzõ 30 nap" />
          <TextContainer text="Elõzõ 90 nap" />
        </TableColumnContainer>
        <TableColumnContainer>
          <TextContainer justify={1} text="Összesen" />
          <TextContainer justify={1} text="77.5 év" withBorder />
          <TextContainer justify={1} text="73.3" withIcon={0} />
          <TextContainer justify={1} text="73.2" withIcon={1} />
          <TextContainer justify={1} text="68.5" withIcon={-1} />
        </TableColumnContainer>
        <TableColumnContainer>
          <TextContainer justify={1} text="Nõ" />
          <TextContainer justify={1} text="80.5 év" withBorder />
          <TextContainer justify={1} text="82.3" withIcon={1} />
          <TextContainer justify={1} text="76.2" withIcon={1} />
          <TextContainer justify={1} text="76.1" withIcon={1} />
        </TableColumnContainer>
        <TableColumnContainer>
          <TextContainer justify={1} text="Férfi" />
          <TextContainer justify={1} text="70.6 év" withBorder />
          <TextContainer justify={1} text="82.3" withIcon={1} />
          <TextContainer justify={1} text="76.2" withIcon={1} />
          <TextContainer justify={1} text="76.1" withIcon={1} />
        </TableColumnContainer>
      </div>
    </div>
  )
}

export default SmallCard
