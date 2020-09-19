import React from 'react'
import { groupBy, last, round } from "lodash"

import { FormattedDataObject, RunningAvg } from '../types/Data'
import { getBackground, getPastValue, makeRunningTotal } from '../utils/calculationHelpers'

function useRunningTotalData(data: FormattedDataObject[]) {
  const [runningTotalData, setRunningTotalData] = React.useState([] as RunningAvg[])
  const [runningTotalValues, setRunningTotalValues] = React.useState({
    now: 0,
    day1: 0,
    day7: 0,
    day30: 0,
    day90: 0,
  })

  const isInit = React.useRef(true)
  React.useEffect(() => {
    if (isInit.current && data.length) {
      isInit.current = false
      const groupedFull = groupBy(data, "date")
      const runningTotal = makeRunningTotal(groupedFull)
      setRunningTotalValues({
        now: round(last(runningTotal)?.value || 0),
        day1: getPastValue(runningTotal, 1),
        day7: getPastValue(runningTotal, 7),
        day30: getPastValue(runningTotal, 30),
        day90: getPastValue(runningTotal, 90),
      })
      setRunningTotalData(runningTotal)
    }
  }, [data, runningTotalData])

  return {
    runningTotalData,
    runningTotalRows: [
      {
        text: `${runningTotalValues.now} fõ`,
        withBorder: true,
      },
      {
        text: `${runningTotalValues.day1} fõ`,
        background: getBackground(
          runningTotalValues.now,
          runningTotalValues.day1
        ),
      },
      {
        text: `${runningTotalValues.day7} fõ`,
        background: getBackground(
          runningTotalValues.now,
          runningTotalValues.day7
        ),
      },
      {
        text: `${runningTotalValues.day30} fõ`,
        background: getBackground(
          runningTotalValues.now,
          runningTotalValues.day30
        ),
      },
      {
        text: `${runningTotalValues.day90} fõ`,
        background: getBackground(
          runningTotalValues.now,
          runningTotalValues.day90
        ),
      },
    ],
  }
}

export default useRunningTotalData
