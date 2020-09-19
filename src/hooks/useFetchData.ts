import React from 'react'
import axios from "axios"
import moment from "moment"
import last from "lodash/last"

import { DataObject, FormattedDataObject } from '../types/Data'

import { URL } from '../constants/url'

const useFetchData = () => {
  const [data, setData] = React.useState([] as FormattedDataObject[])
  const [maxDate, setMaxDate] = React.useState({} as Date)
  const [error, setError] = React.useState("")
  const isInit = React.useRef(true)
  React.useEffect(() => {
    if (isInit.current) {
      isInit.current = false
      axios
        .get(URL)
        .then((res) => {
          const formattedData = res.data.data.map((d: DataObject)  => ({
            number: +d.sorszam,
            date: d.datum,
            age: +d.kor,
            gender: d.nem === "Férfi" ? "m" : "f"
          }))
          const dateSortedData = formattedData.sort((a : FormattedDataObject, b: FormattedDataObject) => a.number - b.number)
          const maxDate = last(data)
          setMaxDate(maxDate?.date || new Date())
          setData(dateSortedData)
        })
        .catch((err) => setError(err))
    }
  })
  return { data, maxDate, error }

}

export default useFetchData
