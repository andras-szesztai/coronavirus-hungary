import React from "react"
import { css } from "@emotion/core"
import { groupBy, last } from "lodash"

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
import { useAvgAgeData, useFetchData } from "./hooks"

import { colors, breakpoints } from "./styles/theme"
import { normalTextStyle } from "./styles/styles"
import { Column } from "./types/Columns"
import { makeRunningAvg } from "./utils/calculationHelpers"
import { RunningAvg } from "./types/Data"

const App = () => {
  const { data, maxDate, error } = useFetchData()

  const avgAgeColumns = useAvgAgeData(data, maxDate)

  const [runningAvgData, setRunningAvgData] = React.useState([] as RunningAvg[])
  const [runningAvgValues, setRunningAvgValues] = React.useState({
    now: 0,
    day1: 0,
    day7: 0,
    day30: 0,
    day90: 0,
  })
  console.log("App -> runningAvgValues", runningAvgValues)
  const isInit = React.useRef(true)
  React.useEffect(() => {
    if (isInit.current && data.length) {
      isInit.current = false
      const groupedFull = groupBy(data, "date")
      const runningAvg = makeRunningAvg(groupedFull)
      setRunningAvgValues({
        now: last(runningAvg)?.value || 0,
        day1: runningAvg[runningAvg.length - 2].value,
        day7: 0,
        day30: 0,
        day90: 0,
      })
      setRunningAvgData(runningAvg)
    }
  }, [data, data.length, runningAvgData])

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
              text={`Frissítve: 2020. 09. 19.`}
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
                  rows: [
                    { text: "7 fõ/nap", withBorder: true },
                    {
                      text: "14 fõ/nap",
                      background: colors.accent.primary,
                    },
                    {
                      text: "28 fõ/nap",
                      background: colors.dark.primary,
                    },
                  ],
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
