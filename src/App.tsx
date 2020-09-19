import React from "react"
import { css } from "@emotion/core"

import {
  DashboardContainer,
  MainContainer,
  TitleContainer,
} from "./components/containers"
import { MainTitle } from "./components/titles"
import { BigCard, SmallCard } from "./components/cards"

import { colors, fontSize, fontWeight, breakpoints } from "./styles/theme"
import RowContainer from "./components/containers/RowContainer"

const normalTextStyle = css`
  font-weight: ${fontWeight.md};

  font-size: ${fontSize.xs};

  @media (max-width: ${breakpoints.lg}) {
    font-size: ${fontSize.xs};
  }
`

const App = () => {
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
              }
            `}
          >
            <h3 css={normalTextStyle}>Frissítve: 2020. 09. 19.</h3>
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
            grid-template-rows: repeat(2, 1fr);
            grid-row-gap: 48px;

            @media (max-width: ${breakpoints.lg}) {
              grid-row-gap: 40px;
            }

            @media (max-width: ${breakpoints.md}) {
              grid-row-gap: 32px;
            }
          `}
        >
          <RowContainer>
            <BigCard title="First big card" />
            <SmallCard title="First small card" />
          </RowContainer>
          <RowContainer>
            <BigCard title="Second big card" />
            <SmallCard title="Second small card" />
          </RowContainer>
        </div>
      </DashboardContainer>
    </MainContainer>
  )
}

export default App
