import { duration } from 'itty-time'

export const formatDate = (dateString: string | Date, showDuration: boolean = false): string => {
  const date = new Date(dateString)
  if (isNaN(date.getTime())) {
    return 'Invalid Date'
  }
  if (showDuration) {
    return duration(Date.now() - date.getTime(), { parts: 2 }) + ' ago'
  }
  return date.toLocaleDateString() + ' @ ' + date.toLocaleTimeString()
}
