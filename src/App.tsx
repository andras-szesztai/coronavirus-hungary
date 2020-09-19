import React from "react"
import { css } from "@emotion/core"
import moment from "moment"
import { format } from "d3-format"

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

import {
  BIG_CARD_FIRST_COLUMN,
  SMALL_CARD_FIRST_COLUMN,
} from "./constants/firstColumns"
import {
  useAvgAgeData,
  useFetchData,
  useGenderRatioData,
  useRunningAvgData,
  useRunningTotalData,
} from "./hooks"

import { colors, breakpoints } from "./styles/theme"
import { normalTextStyle } from "./styles/styles"
import { Column } from "./types/Columns"

const App = () => {
  const { data, maxDate, error } = useFetchData()

  const avgAgeColumns = useAvgAgeData(data, maxDate)
  const RatioColumns = useGenderRatioData(data, maxDate)
  const { runningAvgData, runningAvgRows } = useRunningAvgData(data)
  const { runningTotalData, runningTotalRows } = useRunningTotalData(data)

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
              title="Elhunytak száma naponta március 20. óta (7 napos mozgóátlag)"
              columns={[
                {
                  rows: BIG_CARD_FIRST_COLUMN,
                },
                {
                  rows: runningAvgRows,
                },
              ]}
              chartData={runningAvgData}
            />
            <BigCard
              title="Elhunytak száma összesen március 20. óta (kumulatív) "
              columns={[
                {
                  rows: BIG_CARD_FIRST_COLUMN,
                },
                {
                  rows: runningTotalRows,
                },
              ]}
              chartData={runningTotalData}
            />
          </ColumnContainer>
          <ColumnContainer>
            <SmallCard title="Elhunytak átlagéletkora">
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
            <SmallCard title="Nemek százalékos megoszlása">
              <div
                css={css`
                  display: grid;
                  grid-template-columns: max-content 1fr;
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
                  {SMALL_CARD_FIRST_COLUMN.map((row, rowIndex) => (
                    <TextContainer
                      key={rowIndex}
                      justify={row.justify}
                      text={row.text}
                      background={row.background}
                      textColor={row.background && colors.light.primary}
                    />
                  ))}
                </TableColumnContainer>
                <div
                  css={css`
                    display: flex;
                    flex-direction: column;
                    justify-content: space-around;
                  `}
                >
                  <div
                    css={css`
                      display: flex;
                      justify-content: space-between;
                    `}
                  >
                    <TextContainer text="Nõ" />
                    <TextContainer text="Férfi" />
                  </div>
                  <div
                    css={css`
                      display: flex;
                      justify-content: space-between;
                      position: relative;
                    `}
                  >
                    <div
                      css={css`
                        width: 40.5%;
                      `}
                    >
                      <TextContainer
                        text="40.5%"
                        background={colors.dark.primary}
                        textColor={colors.light.primary}
                        justify={1}
                      />
                    </div>
                    <div
                      css={css`
                        width: 59.5%;
                      `}
                    >
                      <TextContainer
                        text="59.5%"
                        background={colors.dark.primary}
                        textColor={colors.light.primary}
                      />
                    </div>
                  </div>
                  <TextContainer text="15.6%" />
                  <TextContainer text="hello" />
                  <TextContainer text="hello" />
                </div>
              </div>
            </SmallCard>
          </ColumnContainer>
        </div>
      </DashboardContainer>
    </MainContainer>
  )
}

export default App
