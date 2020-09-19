import React from 'react'

import { SMALL_CARD_FIRST_COLUMN } from '../constants/firstColumns'

import { FormattedDataObject } from '../types/Data'
import { makeDateFiltered, makeGenderFiltered } from '../utils/calculationHelpers'

function useGenderRatioData(data: FormattedDataObject[], maxDate: Date) {
  const [ratioData, setRatioData] = React.useState({
    isInit: false,
    female: {
      ratioNow: 0,
     ratio7: 0,
     ratio30: 0,
     ratio90: 0,
    },
    male: {
     ratioNow: 0,
     ratio7: 0,
     ratio30: 0,
     ratio90: 0,
    },
  })
  console.log("useGenderRatioData -> ratioData", ratioData)

  React.useEffect(() => {
    if (data.length && !ratioData.isInit) {
      const fullData = data
      const day7Data = makeDateFiltered(data, 7, maxDate)
      const day30Data = makeDateFiltered(data, 30, maxDate)
      const day90Data = makeDateFiltered(data, 90, maxDate)
      const newRatioData = {
        isInit: true,
        female: {
          ratioNow: makeGenderFiltered(fullData, "f").length/fullData.length,
          ratio7: makeGenderFiltered(day7Data, "f").length/day7Data.length,
          ratio30: makeGenderFiltered(day30Data, "f").length/day30Data.length,
          ratio90: makeGenderFiltered(day90Data, "f").length/day90Data.length,
        },
        male: {
          ratioNow: makeGenderFiltered(fullData, "m").length/fullData.length,
          ratio7: makeGenderFiltered(day7Data, "m").length/day7Data.length,
          ratio30: makeGenderFiltered(day30Data, "m").length/day30Data.length,
          ratio90: makeGenderFiltered(day90Data, "m").length/day90Data.length,
        },
      }
      setRatioData(newRatioData)
    }
  }, [data, maxDate, ratioData.isInit])

  return [
    { rows: SMALL_CARD_FIRST_COLUMN },
    // {
    //   rows: [
    //     { text: "Összesen" },
    //     { text: `${avgAgeData.total.avgNow} év`, withBorder: true },
    //     { text: `${avgAgeData.total.avg7} év` },
    //     { text: `${avgAgeData.total.avg30} év` },
    //     { text: `${avgAgeData.total.avg90} év` },
    //   ],
    // },
    // {
    //   rows: [
    //     { text: "Nõ" },
    //     { text: `${avgAgeData.female.avgNow} év`, withBorder: true },
    //     { text: `${avgAgeData.female.avg7} év` },
    //     { text: `${avgAgeData.female.avg30} év` },
    //     { text: `${avgAgeData.female.avg90} év` },
    //   ],
    // },
    // {
    //   rows: [
    //     { text: "Férfi" },
    //     { text: `${avgAgeData.male.avgNow} év`, withBorder: true },
    //     { text: `${avgAgeData.male.avg7} év` },
    //     { text: `${avgAgeData.male.avg30} év` },
    //     { text: `${avgAgeData.male.avg90} év` },
    //   ],
    // },
  ]
}

export default useGenderRatioData
