export interface DataObject {
  datum: string
  kor: string
  nem: string
  sorszam: string
}

export interface FormattedDataObject {
  date: Date
  age: number
  gender: string
  number: number
}

export interface RunningAvg {
    date: Date;
    value: number;
}
