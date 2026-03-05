const NOTIFICATIONS_STORAGE_KEY = 'my_nutririon_notifications_enabled_v1'

export const loadMealNotificationsEnabled = () => {
  if (typeof window === 'undefined') return false
  return localStorage.getItem(NOTIFICATIONS_STORAGE_KEY) === 'true'
}

export const saveMealNotificationsEnabled = (enabled: boolean) => {
  if (typeof window === 'undefined') return

  if (enabled) {
    localStorage.setItem(NOTIFICATIONS_STORAGE_KEY, 'true')
    return
  }

  localStorage.removeItem(NOTIFICATIONS_STORAGE_KEY)
}

export const getNextReminderDate = (mealTime: string, minutesBefore: number) => {
  const [hourPart, minutePart] = mealTime.split(':')
  const hour = Number(hourPart)
  const minute = Number(minutePart)

  if (!Number.isFinite(hour) || !Number.isFinite(minute)) {
    throw new Error(`Invalid meal time: ${mealTime}`)
  }

  const reminderDate = new Date()
  reminderDate.setHours(hour, minute, 0, 0)
  reminderDate.setMinutes(reminderDate.getMinutes() - minutesBefore)

  if (reminderDate.getTime() <= Date.now()) {
    reminderDate.setDate(reminderDate.getDate() + 1)
  }

  return reminderDate
}
