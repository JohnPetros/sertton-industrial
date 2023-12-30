import 'dayjs/locale/pt-br'

import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'

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

  localize(date: Date) {
    return dayjs(date).tz('Africa/Lagos').toDate()
  },

  format(date: Date, format: DateFormat) {
    return dayjs(date).format(format)
  },

  getDiffInSeconds(currentDate: Date, futureDate: Date): number {
    const date1 = this.localize(currentDate)
    const date2 = this.localize(futureDate)

    return dayjs(date2).diff(date1, 'second')
  },
}
