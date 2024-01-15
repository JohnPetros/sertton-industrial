export type DateFormat =
  | 'YYYY-MM-DD HH:mm:ss'
  | 'DD/MM/YYYY'
  | 'DD/MM/YYYY HH:mm'
  | 'YYYY'

export interface IDateProvider {
  calculateTimeUtilTodayEnd: () => {
    hours: number
    minutes: number
    seconds: number
  }
  getDiffInSeconds: (currentDate: Date, futureDate: Date) => number
  format(date: Date, format: DateFormat): string
}
