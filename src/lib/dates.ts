export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  if (isNaN(date.getTime())) {
    return 'Invalid Date'
  }
  return date.toLocaleDateString() + ' @ ' + date.toLocaleTimeString()
}
