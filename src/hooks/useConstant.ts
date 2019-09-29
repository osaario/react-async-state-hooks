import { useState, useEffect } from "react"
import { AsyncData, Progress } from "../types/Async"

export function useAsyncConstant<T>(value: () => Promise<T>) {
  const [data, setData] = useState({
    data: null,
    progress: Progress.Progressing
  } as AsyncData<T | null>)
  const [resolved, setResolved] = useState(false)
  useEffect(() => {
    if (!resolved)
      value().then(data => {
        setData({
          data,
          progress: Progress.Normal
        })
        setResolved(true)
      })
  })
  return data
}

export function useAsyncVariable<T>(initialValue: () => Promise<T>) {
  const [data, setData] = useState({
    data: null,
    progress: Progress.Progressing
  } as AsyncData<T | null>)
  const [resolved, setResolved] = useState(false)
  const _val = initialValue as () => Promise<T>
  useEffect(() => {
    if (!resolved) {
      _val().then(data => {
        setData({
          data,
          progress: Progress.Normal
        })
        setResolved(true)
      })
    }
  })
  const setter = (value: () => Promise<T>) => {
    setData({
      ...data,
      progress: Progress.Progressing
    })
    value().then(data => {
      setData({
        data,
        progress: Progress.Normal
      })
    })
  }
  return [data, setter] as [AsyncData<T | null>, typeof setter]
}
