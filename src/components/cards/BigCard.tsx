import React from "react"
import { css } from "@emotion/core"

import {
  TableColumnContainer,
  TableContainer,
  TextContainer,
} from "../containers"
import { CardTitle } from "../titles"
import { Column } from "../../types/Columns"
import AreaChart from "../charts/AreaChart"
import LoadingAnimation from "./Loader"

import { RunningAvg } from "../../types/Data"

import { breakpoints, colors } from "../../styles/theme"
import { cardStyle } from "../../styles/styles"
interface Props {
  title: string
  columns: Column[]
  chartData: RunningAvg[]
  isLoading: boolean
  handleClick: () => void
}

const BigCard: React.FC<Props> = ({
  columns,
  title,
  chartData,
  isLoading,
  handleClick,
}) => {
  return (
    <div
      css={css`
        ${cardStyle}
      `}
    >
      <LoadingAnimation isLoading={isLoading} />
      <CardTitle title={title} handleClick={handleClick} />
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
            grid-template-columns: 1fr;
            grid-template-rows: repeat(2, 1fr);
            grid-row-gap: 8px;
          }
        `}
      >
        <div
          css={css`
            border-left: 1px solid ${colors.dark.primary};
            border-bottom: 1px solid ${colors.dark.primary};
            position: relative;
          `}
        >
          <AreaChart data={chartData} />
        </div>
        <TableContainer columns={2} bigCard>
          {columns.map((column, i) => (
            <TableColumnContainer key={i}>
              {column.rows.map((row, rowIndex) => (
                <TextContainer
                  key={rowIndex}
                  text={row.text}
                  justifyIfSmall={row.justifyIfSmall}
                  withBorder={row.withBorder}
                  indicator={row.background}
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
