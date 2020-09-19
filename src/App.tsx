import React from "react"
import { css } from "@emotion/core"
import { meanBy } from "lodash"

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
import { useFetchData } from "./hooks"

import { colors, breakpoints } from "./styles/theme"
import { normalTextStyle } from "./styles/styles"
import { FormattedDataObject } from "./types/Data"
import {
  makeDateFiltered,
  makeGenderFiltered,
} from "./utils/calculationHelpers"
import { Column } from "./types/Columns"

interface Data {
  datum: string
  kor: string
  nem: string
  sorszam: string
}

const App = () => {
  const { data, maxDate, error } = useFetchData()

  const [avgAgeData, setAvgAgeData] = React.useState({
    isInit: false,
    total: {
      avgNow: 0,
      avg7: 0,
      avg30: 0,
      avg90: 0,
    },
    female: {
      avgNow: 0,
      avg7: 0,
      avg30: 0,
      avg90: 0,
    },
    male: {
      avgNow: 0,
      avg7: 0,
      avg30: 0,
      avg90: 0,
    },
  })

  React.useEffect(() => {
    if (data.length && !avgAgeData.isInit) {
      const fullData = data
      const day7Data = makeDateFiltered(data, 7, maxDate)
      const day30Data = makeDateFiltered(data, 30, maxDate)
      const day90Data = makeDateFiltered(data, 90, maxDate)
      const newAvgAgeData = {
        isInit: true,
        total: {
          avgNow: +meanBy(fullData, "age").toFixed(1),
          avg7: +meanBy(day7Data, "age").toFixed(1),
          avg30: +meanBy(day30Data, "age").toFixed(1),
          avg90: +meanBy(day90Data, "age").toFixed(1),
        },
        female: {
          avgNow: +meanBy(makeGenderFiltered(fullData, "f"), "age").toFixed(1),
          avg7: +meanBy(makeGenderFiltered(day7Data, "f"), "age").toFixed(1),
          avg30: +meanBy(makeGenderFiltered(day30Data, "f"), "age").toFixed(1),
          avg90: +meanBy(makeGenderFiltered(day90Data, "f"), "age").toFixed(1),
        },
        male: {
          avgNow: +meanBy(makeGenderFiltered(fullData, "m"), "age").toFixed(1),
          avg7: +meanBy(makeGenderFiltered(day7Data, "m"), "age").toFixed(1),
          avg30: +meanBy(makeGenderFiltered(day30Data, "m"), "age").toFixed(1),
          avg90: +meanBy(makeGenderFiltered(day90Data, "m"), "age").toFixed(1),
        },
      }
      setAvgAgeData(newAvgAgeData)
    }
  }, [avgAgeData, data, data.length, maxDate])

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
                {[
                  { rows: SMALL_CARD_FIRST_COLUMN },
                  {
                    rows: [
                      { text: "Összesen" },
                      { text: avgAgeData.total.avgNow, withBorder: true },
                      { text: avgAgeData.total.avg7 },
                      { text: avgAgeData.total.avg30 },
                      { text: avgAgeData.total.avg90 },
                    ],
                  },
                  {
                    rows: [
                      { text: "Nõ" },
                      { text: avgAgeData.female.avgNow, withBorder: true },
                      { text: avgAgeData.female.avg7 },
                      { text: avgAgeData.female.avg30 },
                      { text: avgAgeData.female.avg90 },
                    ],
                  },
                ].map((column: Column, i) => (
                  <TableColumnContainer key={i}>
                    {column.rows.map((row, rowIndex) => (
                      <TextContainer
                        key={rowIndex}
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
            </SmallCard>
            <SmallCard title="Nemek százalékos megoszlása" />
          </ColumnContainer>
        </div>
      </DashboardContainer>
    </MainContainer>
  )
}

export default App
