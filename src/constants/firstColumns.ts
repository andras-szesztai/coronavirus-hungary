import { colors } from "../styles/theme"

export const BIG_CARD_FIRST_COLUMN = [
  { text: "Jelenleg", justifyIfSmall: true },
  { text: "1 nappal ezelõtt", justifyIfSmall: true },
  { text: "7 nappal ezelõtt", justifyIfSmall: true },
  { text: "30 nappal ezelõtt", justifyIfSmall: true },
  { text: "90 nappal ezelõtt", justifyIfSmall: true },
]

export const SMALL_CARD_FIRST_COLUMN = [
  { text: "-", background: colors.light.primary },
  { text: "Összesen", justify: 1 },
  { text: "Elõzõ 7 nap", justify: 1 },
  { text: "Elõzõ 30 nap", justify: 1 },
  { text: "Elõzõ 90 nap", justify: 1}
]