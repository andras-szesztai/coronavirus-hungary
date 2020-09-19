import React from "react"
import { css } from "@emotion/core"
import axis from "axios"

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
import { URL } from "./constants/url"

import { colors, breakpoints } from "./styles/theme"
import { normalTextStyle } from "./styles/styles"

interface Data {
  datum: string
  kor: string
  nem: string
  sorszam: string
}

const App = () => {
  const [data, setData] = React.useState([] as Data[])
  const [error, setError] = React.useState("")
  const isInit = React.useRef(true)
  React.useEffect(() => {
    if (isInit.current) {
      isInit.current = false
      axis
        .get(URL)
        .then((res) => setData(res.data.data))
        .catch((err) => setError(err))
    }
  })

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
                {[{ rows: SMALL_CARD_FIRST_COLUMN }].map((column, i) => (
                  <TableColumnContainer key={i}>
                    {column.rows.map((row, rowIndex) => (
                      <TextContainer
                        key={rowIndex}
                        justify={1}
                        text={row.text}
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
