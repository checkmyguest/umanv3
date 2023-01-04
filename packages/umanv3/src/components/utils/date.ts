import { addDays, endOfMonth, format, startOfMonth, subDays, subMonths } from "date-fns"

export const computeDate = (option: string) => {
  if (!option) return
  const currentDate = new Date()
  let beforeDate
  let afterDate
  let onDate
  switch (option) {
    case "last_month": {
      const lastMonth = subMonths(currentDate, 1)
      beforeDate = endOfMonth(lastMonth)
      afterDate = startOfMonth(lastMonth)
      break
    }
    case "before_yesterday": {
      onDate = subDays(currentDate, 2)
      break
    }
    case "yesterday": {
      onDate = subDays(currentDate, 1)
      break
    }
    case "today": {
      onDate = currentDate
      break
    }
    case "tomorrow": {
      onDate = addDays(currentDate, 1)
      break
    }
    case "after_tomorrow": {
      onDate = addDays(currentDate, 2)
      break
    }
    case "current_month": {
      beforeDate = endOfMonth(currentDate)
      afterDate = startOfMonth(currentDate)
      break
    }
    case "next_month": {
      const nextMonth = subMonths(currentDate, 1)
      beforeDate = endOfMonth(nextMonth)
      afterDate = startOfMonth(nextMonth)
      break
    }
  }
  return {
    onDate: onDate && format(onDate, "yyyy-MM-dd"),
    beforeDate: beforeDate && format(beforeDate, "yyyy-MM-dd"),
    afterDate: afterDate && format(afterDate, "yyyy-MM-dd"),
  }
}
