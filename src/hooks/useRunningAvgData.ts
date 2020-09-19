import React from 'react'
import { groupBy, last, round } from "lodash"

import { FormattedDataObject, RunningAvg } from '../types/Data'
import { getBackground, getPastValue, makeRunningAvg } from '../utils/calculationHelpers'

function useRunningAvgData(data: FormattedDataObject[]) {
  const [runningAvgData, setRunningAvgData] = React.useState([] as RunningAvg[])
  const [runningAvgValues, setRunningAvgValues] = React.useState({
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
      const runningAvg = makeRunningAvg(groupedFull)
      setRunningAvgValues({
        now: round(last(runningAvg)?.value || 0),
        day1: getPastValue(runningAvg, 1),
        day7: getPastValue(runningAvg, 7),
        day30: getPastValue(runningAvg, 30),
        day90: getPastValue(runningAvg, 90),
      })
      setRunningAvgData(runningAvg)
    }
  }, [data, runningAvgData])

  return {
    runningAvgData,
    runningAvgRows: [
      {
        text: `${runningAvgValues.now} fõ/nap`,
        withBorder: true,
      },
      {
        text: `${runningAvgValues.day1} fõ/nap`,
        background: getBackground(
          runningAvgValues.now,
          runningAvgValues.day1
        ),
      },
      {
        text: `${runningAvgValues.day7} fõ/nap`,
        background: getBackground(
          runningAvgValues.now,
          runningAvgValues.day7
        ),
      },
      {
        text: `${runningAvgValues.day30} fõ/nap`,
        background: getBackground(
          runningAvgValues.now,
          runningAvgValues.day30
        ),
      },
      {
        text: `${runningAvgValues.day90} fõ/nap`,
        background: getBackground(
          runningAvgValues.now,
          runningAvgValues.day90
        ),
      },
    ],
  }
}

export default useRunningAvgData
