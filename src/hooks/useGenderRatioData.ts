import React from 'react'
import { round } from "lodash"

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

  React.useEffect(() => {
    if (data.length && !ratioData.isInit) {
      const fullData = data
      const day7Data = makeDateFiltered(data, 7, maxDate)
      const day30Data = makeDateFiltered(data, 30, maxDate)
      const day90Data = makeDateFiltered(data, 90, maxDate)
      const newRatioData = {
        isInit: true,
        female: {
          ratioNow: round(makeGenderFiltered(fullData, "f").length/fullData.length * 100, 1),
          ratio7: round(makeGenderFiltered(day7Data, "f").length/day7Data.length * 100, 1),
          ratio30: round(makeGenderFiltered(day30Data, "f").length/day30Data.length * 100, 1),
          ratio90: round(makeGenderFiltered(day90Data, "f").length/day90Data.length * 100, 1),
        },
        male: {
          ratioNow: round(makeGenderFiltered(fullData, "m").length/fullData.length * 100, 1),
          ratio7: round(makeGenderFiltered(day7Data, "m").length/day7Data.length * 100, 1),
          ratio30: round(makeGenderFiltered(day30Data, "m").length/day30Data.length * 100, 1),
          ratio90: round(makeGenderFiltered(day90Data, "m").length/day90Data.length * 100, 1),
        },
      }
      setRatioData(newRatioData)
    }
  }, [data, maxDate, ratioData.isInit])

  return [ {
    female: ratioData.female.ratioNow, male:ratioData.male.ratioNow
  },
  {
    female: ratioData.female.ratio7, male:ratioData.male.ratio7
  },
  {
    female: ratioData.female.ratio30, male:ratioData.male.ratio30
  },
  {
    female: ratioData.female.ratio90, male:ratioData.male.ratio90
  }
  ]
}

export default useGenderRatioData
