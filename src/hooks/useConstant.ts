import { useState, useEffect } from "react"
import { AsyncData, Progress } from "../types/Async"

export function useAsyncConstant<T>(value: () => Promise<T>) {
  const [data, setData] = useState({
    data: null,
    progress: Progress.Progressing
  } as AsyncData<T | null>)
  useEffect(() => {
    value().then(data => {
      setData({
        data,
        progress: Progress.Normal
      })
    })
  })
  return data
}
