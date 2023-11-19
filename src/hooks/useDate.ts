import { useMemo } from 'react'

export function useDate() {
  const timeUtilTodayEnd = useMemo(() => {
    const currentDate = new Date()
    const todayEnd = new Date()
    todayEnd.setHours(23, 59, 59, 999)

    const difference = todayEnd.getTime() - currentDate.getTime()

    const hours = Math.floor(difference / (1000 * 60 * 60))
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((difference % (1000 * 60)) / 1000)

    return {
      hours,
      minutes,
      seconds,
    }
  }, [])

  return {
    timeUtilTodayEnd,
  }
}
