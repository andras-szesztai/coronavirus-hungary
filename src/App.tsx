import React from "react"
import { css } from "@emotion/core"

import { colors, fontSize, fontWeight, breakpoints } from "./styles/theme"

const borderStyle = `border: 1px solid ${colors.dark.primary};`

const normalTextStyle = css`
  font-weight: ${fontWeight.md};

  font-size: ${fontSize.xs};

  @media (max-width: ${breakpoints.lg}) {
    font-size: ${fontSize.xs};
  }
`

const App = () => {
  return (
    <div
      css={css`
        width: 100vw;
        height: 100vh;
        position: relative;
        padding: 32px 64px 48px 64px;

        @media (max-width: ${breakpoints.lg}) {
          padding: 24px 48px 32px 48px;
        }

        @media (max-width: ${breakpoints.md}) {
          padding: 16px 32px 24px 32px;
        }
      `}
    >
      <div
        css={css`
          width: 100%;
          height: 100%;
          display: grid;
          grid-template-rows: 80px 1fr;
          grid-row-gap: 40px;
          ${borderStyle}
        `}
      >
        <div
          css={css`
            place-self: stretch;
            display: grid;
            grid-template-columns: max-content 1fr;
            /* grid-column-gap: 40px; */
            ${borderStyle}
          `}
        >
          <h1
            css={css`
              place-self: stretch;
              display: grid;
              align-items: center;

              font-size: ${fontSize.xxl.primary};
              font-weight: ${fontWeight.xs};

              @media (max-width: ${breakpoints.lg}) {
                font-size: ${fontSize.xxl.secondary};
              }

              @media (max-width: ${breakpoints.md}) {
                font-size: ${fontSize.xxl.tertiary};
              }
            `}
          >
            Koronavírus Magyarországon
          </h1>
          <div
            css={css`
              display: grid;
              justify-content: end;
              align-items: center;
              grid-template-columns: repeat(2, max-content);
              grid-column-gap: 32px;
            `}
          >
            <h3 css={normalTextStyle}>Frissítve: 2020. 09. 19.</h3>
            <h3 css={normalTextStyle}>Forrás: </h3>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
