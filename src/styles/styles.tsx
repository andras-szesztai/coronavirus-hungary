import { css } from "@emotion/core"

import { breakpoints, colors } from "./theme"

export const cardStyle = css`
  background-color: ${colors.light.primary};
  border-radius: 8px;
  padding: 16px;
  color: ${colors.dark.primary};

  display: grid;
  grid-template-rows: min-content 1fr;
  grid-row-gap: 16px;

  @media (max-width: ${breakpoints.md}) {
    padding: 12px;
    grid-row-gap: 12px;
  }

  @media (max-width: ${breakpoints.sm}) {
    padding: 8px;
    grid-row-gap: 8px;
  }
`

