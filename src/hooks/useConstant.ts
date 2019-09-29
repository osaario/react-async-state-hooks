import { useState, useEffect } from "react"
import { AsyncData, Progress } from "../types/Async"

export function useAsyncConstant<T>(value: () => Promise<T>) {
  const [data, setData] = useState({
    data: null,
    progress: "progressing"
  } as AsyncData<T | null>)
  const [triggered, setTriggered] = useState(false)
  useEffect(() => {
    if (!triggered) {
      setTriggered(true)
      value().then(
        data => {
          setData({
            data,
            progress: "normal"
          })
        },
        rejection => {
          setData({
            ...data,
            progress: new Error(rejection)
          })
        }
      )
    }
  })
  return data
}

export function useAsyncVariable<T>(initialValue: () => Promise<T>) {
  const [data, setData] = useState({
    data: null,
    progress: "progressing"
  } as AsyncData<T | null>)
  const [triggered, setTriggered] = useState(false)
  useEffect(() => {
    if (!triggered) {
      setTriggered(true)
      initialValue().then(
        data => {
          setData({
            data,
            progress: "normal"
          })
        },
        rejection => {
          setData({
            ...data,
            progress: new Error(rejection)
          })
        }
      )
    }
  })
  const setter = (value: () => Promise<T>) => {
    setData({
      ...data,
      progress: "progressing"
    })
    value().then(
      data => {
        setData({
          data,
          progress: "normal"
        })
      },
      rejection => {
        setData({
          ...data,
          progress: new Error(rejection)
        })
      }
    )
  }
  return [data, setter] as [AsyncData<T | null>, typeof setter]
}
