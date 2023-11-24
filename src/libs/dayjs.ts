import 'dayjs/locale/pt-br'

import dayjs from 'dayjs'

import { DateProvider } from '@/@types/dateProvider'

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

  formatDate(date: string) {
    return dayjs(date).format('DD/MM/YYYY')
  },
}
