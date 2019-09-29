export enum Progress {
  Normal = 1,
  Progressing,
  Done,
  Error
}

export type AsyncData<T> = {
  data: T
  progress: Progress
}
