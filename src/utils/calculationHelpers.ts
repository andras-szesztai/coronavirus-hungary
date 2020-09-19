import { FormattedDataObject } from "../types/Data"
import moment from "moment"

export const  makeDateFiltered = (data: FormattedDataObject[], days: number, maxDate: Date) => {
  const limitDate = moment(maxDate).subtract("days", days).toDate()
  return data.filter((d) => d.date >= limitDate)
}

export const  makeGenderFiltered = (data: FormattedDataObject[], gender: string) => {
  return data.filter((d) => d.gender === gender)
}