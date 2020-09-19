import React from "react"
import { css } from "@emotion/core"
import moment from "moment"
import Modal from "react-modal"
import chroma from "chroma-js"

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
import { EXPLAIN } from "./constants/text"

const App = () => {
  const { data, maxDate, isLoading } = useFetchData()

  const avgAgeColumns = useAvgAgeData(data, maxDate)
  const ratioRows = useGenderRatioData(data, maxDate)
  const { runningAvgData, runningAvgRows } = useRunningAvgData(data)
  const { runningTotalData, runningTotalRows } = useRunningTotalData(data)

  const [isModal, setIsModal] = React.useState("")

  const modalStyle = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
    overlay: {
      zIndex: 110,
      cursor: "pointer",
      backgroundColor: chroma(colors.dark.primary).alpha(0.8).hex(),
    },
  }

  return (
    <MainContainer>
      {isModal && (
        <Modal
          isOpen={!!isModal}
          style={modalStyle}
          onRequestClose={() => setIsModal("")}
          contentLabel="Example Modal"
        >
          <div
            css={css`
              color: ${colors.dark.primary};
              max-width: 200px;
              line-height: 1.75;
            `}
          >
            <SimpleText text={EXPLAIN[isModal].hu} />
          </div>
        </Modal>
      )}
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
              isLoading={isLoading}
              handleClick={() => setIsModal("cumulative")}
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
              isLoading={isLoading}
              handleClick={() => setIsModal("daily")}
            />
          </ColumnContainer>
          <ColumnContainer>
            <SmallCard
              isLoading={isLoading}
              title="Elhunytak átlagéletkora"
              handleClick={() => setIsModal("age")}
            >
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
            <SmallCard
              isLoading={isLoading}
              title="Nemek százalékos megoszlása"
              handleClick={() => setIsModal("ratio")}
            >
              <div
                css={css`
                  display: grid;
                  grid-template-columns: max-content 1fr;
                  grid-column-gap: 16px;

                  @media (max-width: ${breakpoints.md}) {
                    grid-column-gap: 12px;
                  }

                  @media (max-width: ${breakpoints.sm}) {
                    grid-column-gap: 8px;
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
                  {ratioRows.map((row, i) => {
                    return (
                      <div
                        key={i}
                        css={css`
                          display: flex;
                          justify-content: space-between;
                          position: relative;
                        `}
                      >
                        <div
                          css={css`
                            width: ${row.female}%;
                          `}
                        >
                          <TextContainer
                            text={`${row.female}%`}
                            background={colors.dark.primary}
                            textColor={colors.light.primary}
                            justify={1}
                          />
                        </div>
                        <div
                          css={css`
                            width: ${row.male}%;
                          `}
                        >
                          <TextContainer
                            text={`${row.male}%`}
                            background={colors.dark.primary}
                            textColor={colors.light.primary}
                          />
                        </div>
                      </div>
                    )
                  })}
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
