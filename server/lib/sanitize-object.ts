export const sanitizeObject = (keysToRemove: string[]) => (obj: any) => {
  if (obj === null || typeof obj !== 'object') {
    return obj
  }

  if (Array.isArray(obj)) {
    return obj.map(sanitizeObject(keysToRemove))
  }

  const newObj: any = {}
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      if (keysToRemove.includes(key)) {
        continue
      }
      newObj[key] = sanitizeObject(keysToRemove)(obj[key])
    }
  }
  return newObj
}
