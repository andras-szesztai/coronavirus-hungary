import { FormattedDataObject, RunningAvg } from "../types/Data"
import moment from "moment"
import { Dictionary, meanBy, round } from "lodash"

import { DATE_FORMAT } from "../constants/data"
import { colors } from "../styles/theme"

export const  makeDateFiltered = (data: FormattedDataObject[], days: number, maxDate: Date) => {
  const limitDate = moment(maxDate).subtract("days", days).toDate()
  return data.filter((d) => moment(d.date, DATE_FORMAT).toDate() >= limitDate)
}

export const  makeGenderFiltered = (data: FormattedDataObject[], gender: string) => {
  return data.filter((d) => d.gender === gender)
}

function getDaysArray(start: string, end: string) {
  var arr = []
  for (
    var dt = moment(start, DATE_FORMAT).toDate();
    dt <= moment(end, DATE_FORMAT).toDate();
    dt.setDate(dt.getDate() + 1)
  ) {
    arr.push(moment(dt).format(DATE_FORMAT))
  }
  return arr
}

export function makeRunningAvg(dateGrouped:  Dictionary<FormattedDataObject[]>) {
  const allDates = Object.keys(dateGrouped)
  const enrichedAllDates = getDaysArray(
    allDates[0],
    allDates[allDates.length - 1]
  )
  const enrichedDateGroupped = enrichedAllDates.map(date => ({
    date,
    num: dateGrouped[date] ? dateGrouped[date].length : 0,
  }))
  const movingAvg = enrichedAllDates.map((date, i) => {
    if (
      moment(date, DATE_FORMAT).toDate() <
      moment("3/26/20", DATE_FORMAT).toDate()
    ) {
      return { date: moment(date, DATE_FORMAT).toDate(), value: 0 }
    }
    const value = meanBy(enrichedDateGroupped.slice(i - 6, i), "num")
    return {
      date: moment(date, DATE_FORMAT).toDate(),
      value,
    }
  })
  return movingAvg
}

export const getPastValue = (data: RunningAvg[], days: number) => round(data[data.length - (days + 1)].value)


export const getBackground = (base: number, comp: number) => base > comp ? colors.accent.primary : colors.dark.primary
