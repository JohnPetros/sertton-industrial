import 'dayjs/locale/pt-br'

import dayjs from 'dayjs'

import { DateFormat, DateProvider } from '@/@types/dateProvider'

dayjs.locale('pt-br')

export const dayjsProvider: DateProvider = {
  calculateTimeUtilTodayEnd() {
    const currentDate = dayjs()
    const todayEnd = currentDate.endOf('day')

    const difference = todayEnd.diff(currentDate)

    const hours = Math.floor(difference / (1000 * 60 * 60))
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((difference % (1000 * 60)) / 1000)

    return {
      hours,
      minutes,
      seconds,
    }
  },

  format(date: Date, format: DateFormat) {
    return dayjs(date).format(format)
  },

  getDiffInSeconds(currentDate: Date, futureDate: Date): number {
    const date1 = dayjs(currentDate)
    const date2 = dayjs(futureDate)

    return date2.diff(date1, 'second')
  },
}
