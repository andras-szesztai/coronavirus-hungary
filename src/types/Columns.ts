export interface Row {
  text: string | number
  withBorder?: boolean
  background?: string
  justify?: number
  justifyIfSmall?: boolean
}

export interface Column {
  rows: Row[]
}