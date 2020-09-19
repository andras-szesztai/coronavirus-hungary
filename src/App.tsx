import React from "react"
import { css } from "@emotion/core"
import { groupBy, last, round } from "lodash"
import moment from "moment"

import {
  DashboardContainer,
  MainContainer,
  TitleContainer,
  ColumnContainer,
  TableContainer,
  TableColumnContainer,
  TextContainer,
} from "./components/containers"
import { MainTitle, SimpleText } from "./components/titles"
import { BigCard, SmallCard } from "./components/cards"

import { BIG_CARD_FIRST_COLUMN } from "./constants/firstColumns"
import { useAvgAgeData, useFetchData, useRunningAvgData } from "./hooks"

import { colors, breakpoints } from "./styles/theme"
import { normalTextStyle } from "./styles/styles"
import { Column } from "./types/Columns"

const App = () => {
  const { data, maxDate, error } = useFetchData()

  const avgAgeColumns = useAvgAgeData(data, maxDate)
  const { runningAvgData, runningAvgRows } = useRunningAvgData(data)

  return (
    <MainContainer>
      <DashboardContainer>
        <TitleContainer>
          <MainTitle />
          <div
            css={css`
              display: grid;
              align-items: center;
              grid-template-columns: repeat(2, max-content);
              grid-column-gap: 32px;

              justify-content: end;

              @media (max-width: ${breakpoints.sm}) {
                justify-content: start;
                grid-column-gap: 24px;
              }
            `}
          >
            <SimpleText
              text={`Frissítve: ${moment(maxDate).format("YYYY. MM. DD.")}`}
              color={colors.light.primary}
            />
            <h3
              css={css`
                ${normalTextStyle}
              `}
            >
              Forrás:{" "}
              <a
                css={css`
                  color: ${colors.light.primary};
                `}
                href="https://koronavirus.gov.hu"
                target="_blank"
                rel="noopener noreferrer"
              >
                koronavirus.gov.hu
              </a>
            </h3>
          </div>
        </TitleContainer>
        <div
          css={css`
            place-self: stretch;
            display: grid;
            grid-template-columns: 1fr max-content;
            grid-column-gap: 48px;

            @media (max-width: ${breakpoints.lg}) {
              grid-column-gap: 40px;
            }

            @media (max-width: ${breakpoints.md}) {
              grid-column-gap: 32px;
            }

            @media (max-width: ${breakpoints.sm}) {
              grid-column-gap: 0px;
              grid-template-columns: 1fr;
              grid-row-gap: 24px;
              grid-template-rows: repeat(2, min-content);
            }
          `}
        >
          <ColumnContainer>
            <BigCard
              title="Elhunytak száma naponta (7 napos mozgóátlag)"
              columns={[
                {
                  rows: BIG_CARD_FIRST_COLUMN,
                },
                {
                  rows: runningAvgRows,
                },
              ]}
            />
            <BigCard
              title="Elhunytak száma összesen (kumulatív)"
              columns={[
                {
                  rows: BIG_CARD_FIRST_COLUMN,
                },
                {
                  rows: runningAvgRows,
                },
              ]}
            />
          </ColumnContainer>
          <ColumnContainer>
            <SmallCard title="Elhunytak átlagéletkora (év)">
              <TableContainer columns={4}>
                {avgAgeColumns.map((column: Column, i) => (
                  <TableColumnContainer key={i}>
                    {column.rows.map((row, rowIndex) => (
                      <TextContainer
                        key={rowIndex}
                        justify={row.justify}
                        text={row.text}
                        withBorder={row.withBorder}
                        background={row.background}
                        textColor={row.background && colors.light.primary}
                      />
                    ))}
                  </TableColumnContainer>
                ))}
              </TableContainer>
            </SmallCard>
            <SmallCard title="Nemek százalékos megoszlása" />
          </ColumnContainer>
        </div>
      </DashboardContainer>
    </MainContainer>
  )
}

export default App
