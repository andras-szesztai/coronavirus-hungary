import React from "react"
import { css } from "@emotion/core"

import {
  TableColumnContainer,
  TableContainer,
  TextContainer,
} from "../containers"

import { cardStyle } from "../../styles/styles"
import { CardTitle } from "../titles"
import { breakpoints, colors } from "../../styles/theme"

interface Row {
  text: string
  withBorder?: boolean
  background?: string
}
interface Column {
  rows: Row[]
}
interface Props {
  title: string
  columns: Column[]
}

const BigCard: React.FC<Props> = ({ columns, title }) => {
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
          grid-column-gap: 24px;

          @media (max-width: ${breakpoints.lg}) {
            grid-column-gap: 16px;
          }

          @media (max-width: ${breakpoints.md}) {
            grid-column-gap: 12px;
          }
          @media (max-width: ${breakpoints.sm}) {
            grid-column-gap: 8px;
          }
        `}
      >
        <div
          css={css`
            border: 1px solid ${colors.dark.primary};
          `}
        />
        <TableContainer columns={2}>
          {columns.map((column) => (
            <TableColumnContainer>
              {column.rows.map((row) => (
                <TextContainer
                  justify={1}
                  text={row.text}
                  withBorder={row.withBorder}
                  background={row.background}
                  textColor={row.background && colors.light.primary}
                />
              ))}
            </TableColumnContainer>
          ))}
        </TableContainer>
      </div>
    </div>
  )
}

export default BigCard
