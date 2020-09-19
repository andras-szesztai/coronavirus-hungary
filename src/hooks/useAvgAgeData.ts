import React from 'react'
import { meanBy } from "lodash"

import { SMALL_CARD_FIRST_COLUMN } from '../constants/firstColumns'

import { FormattedDataObject } from '../types/Data'
import { makeDateFiltered, makeGenderFiltered } from '../utils/calculationHelpers'

function useAvgAgeData(data: FormattedDataObject[], maxDate: Date) {
  const [avgAgeData, setAvgAgeData] = React.useState({
    isInit: false,
    total: {
      avgNow: 0,
      avg7: 0,
      avg30: 0,
      avg90: 0,
    },
    female: {
      avgNow: 0,
      avg7: 0,
      avg30: 0,
      avg90: 0,
    },
    male: {
      avgNow: 0,
      avg7: 0,
      avg30: 0,
      avg90: 0,
    },
  })

  React.useEffect(() => {
    if (data.length && !avgAgeData.isInit) {
      const fullData = data
      const day7Data = makeDateFiltered(data, 7, maxDate)
      const day30Data = makeDateFiltered(data, 30, maxDate)
      const day90Data = makeDateFiltered(data, 90, maxDate)
      const newAvgAgeData = {
        isInit: true,
        total: {
          avgNow: +meanBy(fullData, "age").toFixed(1),
          avg7: +meanBy(day7Data, "age").toFixed(1),
          avg30: +meanBy(day30Data, "age").toFixed(1),
          avg90: +meanBy(day90Data, "age").toFixed(1),
        },
        female: {
          avgNow: +meanBy(makeGenderFiltered(fullData, "f"), "age").toFixed(1),
          avg7: +meanBy(makeGenderFiltered(day7Data, "f"), "age").toFixed(1),
          avg30: +meanBy(makeGenderFiltered(day30Data, "f"), "age").toFixed(1),
          avg90: +meanBy(makeGenderFiltered(day90Data, "f"), "age").toFixed(1),
        },
        male: {
          avgNow: +meanBy(makeGenderFiltered(fullData, "m"), "age").toFixed(1),
          avg7: +meanBy(makeGenderFiltered(day7Data, "m"), "age").toFixed(1),
          avg30: +meanBy(makeGenderFiltered(day30Data, "m"), "age").toFixed(1),
          avg90: +meanBy(makeGenderFiltered(day90Data, "m"), "age").toFixed(1),
        },
      }
      setAvgAgeData(newAvgAgeData)
    }
  }, [avgAgeData, data, maxDate])

  return [
    { rows: SMALL_CARD_FIRST_COLUMN },
    {
      rows: [
        { text: "Összesen" },
        { text: avgAgeData.total.avgNow, withBorder: true },
        { text: avgAgeData.total.avg7 },
        { text: avgAgeData.total.avg30 },
        { text: avgAgeData.total.avg90 },
      ],
    },
    {
      rows: [
        { text: "Nõ" },
        { text: avgAgeData.female.avgNow, withBorder: true },
        { text: avgAgeData.female.avg7 },
        { text: avgAgeData.female.avg30 },
        { text: avgAgeData.female.avg90 },
      ],
    },
    {
      rows: [
        { text: "Férfi" },
        { text: avgAgeData.male.avgNow, withBorder: true },
        { text: avgAgeData.male.avg7 },
        { text: avgAgeData.male.avg30 },
        { text: avgAgeData.male.avg90 },
      ],
    },
  ]
}

export default useAvgAgeData
