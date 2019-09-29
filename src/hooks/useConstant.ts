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

export function useAsyncVariable<T>(initialValue: () => Promise<T>) {
  const [data, setData] = useState({
    data: typeof initialValue === "function" ? null : initialValue,
    progress:
      typeof initialValue === "function"
        ? Progress.Progressing
        : Progress.Normal
  } as AsyncData<T | null>)
  const _val = initialValue as () => Promise<T>
  useEffect(() => {
    _val().then(data => {
      setData({
        data,
        progress: Progress.Normal
      })
    })
  })
  const setter = (value: () => Promise<T>) => {
    if (typeof value === "function") {
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
    } else {
      setData({
        data: value,
        progress: Progress.Normal
      })
    }
  }
  return [data, setter] as [AsyncData<T | null>, typeof setter]
}
