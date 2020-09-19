export interface Row {
  text: string | number
  withBorder?: boolean
  background?: string
  justify?: number
}

export interface Column {
  rows: Row[]
}