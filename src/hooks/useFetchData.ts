import React from 'react'
import axios from "axios"
import moment from "moment"
import last from "lodash/last"

import { DataObject, FormattedDataObject } from '../types/Data'

import { URL } from '../constants/url'
import { DATE_FORMAT } from '../constants/data'

const useFetchData = () => {
  const [data, setData] = React.useState([] as FormattedDataObject[])
  const [isLoading, setIsLoading] = React.useState(true)
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
            date: moment(d.datum, DATE_FORMAT).format(DATE_FORMAT),
            age: +d.kor,
            gender: d.nem === "Férfi" ? "m" : "f"
          }))
          const dateSortedData = formattedData.sort((a : FormattedDataObject, b: FormattedDataObject) => a.number - b.number)
          const maxDate = last(data)
          setMaxDate(maxDate?.date || new Date())
          setData(dateSortedData)
          setIsLoading(false)
        })
        .catch((err) => setError(err))
    }
  }, [data])
  return { data, maxDate, error, isLoading }

}

export default useFetchData
