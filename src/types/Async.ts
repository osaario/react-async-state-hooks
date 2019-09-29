export function isError(progress: Progress): progress is Error {
  if (progress !== "progressing" && progress !== "normal") return true
  return false
}
export type Progress = "progressing" | "normal" | Error

export type AsyncData<T> = {
  data: T
  progress: Progress
}
