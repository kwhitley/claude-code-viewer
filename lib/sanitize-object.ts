/**
 * Curried function to remove specified keys (including nested ones) from an object.
 * @param targets - An array of dot-notation strings for keys to remove (e.g., ['key1', 'nested.key2']).
 * @returns A function that takes an object and returns a new object with the specified keys removed.
 */
export const sanitizeObject =
  (targets: string[]) =>
  (obj: any): any => {
    // Deep clone the object to avoid side effects
    const newObj = JSON.parse(JSON.stringify(obj))

    /**
     * Recursively traverses the object to delete a key specified by a path.
     * @param currentObj - The object or sub-object to traverse.
     * @param pathParts - The parts of the key path remaining.
     */
    const remove = (currentObj: any, pathParts: string[]) => {
      if (
        !currentObj ||
        typeof currentObj !== 'object' ||
        pathParts.length === 0
      ) {
        return
      }

      const key = pathParts[0]

      // If this is the last part of the path, delete the key.
      if (pathParts.length === 1) {
        if (Array.isArray(currentObj)) {
          const index = parseInt(key, 10)
          if (!isNaN(index) && index >= 0 && index < currentObj.length) {
            currentObj.splice(index, 1)
          }
        } else {
          delete currentObj[key]
        }
        return
      }

      // If not the last part, continue traversal.
      const nextObj = Array.isArray(currentObj)
        ? currentObj[parseInt(key, 10)]
        : currentObj[key]
      remove(nextObj, pathParts.slice(1))
    }

    // For each target path, start the removal process.
    for (const target of targets) {
      remove(newObj, target.split('.'))
    }

    return newObj
  }
