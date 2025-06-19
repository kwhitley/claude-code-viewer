type FilterFn = (obj: any) => boolean

/**
 * Curried function to filter an object based on a set of predicate functions.
 * It returns true only if all predicate functions return true for the object.
 *
 * @param filterFns - An array of functions that each take an object and return a boolean.
 * @returns A function that takes an object and returns true if it passes all filters, otherwise false.
 */
export const whereObject =
  (filterFns: FilterFn[]) =>
  (obj: any): boolean => {
    return filterFns.every((fn) => {
      try {
        return fn(obj)
      } catch {
        // If a predicate function fails (e.g., due to accessing a deep, non-existent path),
        // it should be treated as a non-match.
        return false
      }
    })
  }
