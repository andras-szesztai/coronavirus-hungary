export interface Row {
  text: string | number
  withBorder?: boolean
  background?: string
}

export interface Column {
  rows: Row[]
}