export type DateProvider = {
  formatDate: (date: string) => string
  calculateTimeUtilTodayEnd: () => {
    hours: number
    minutes: number
    seconds: number
  }
}