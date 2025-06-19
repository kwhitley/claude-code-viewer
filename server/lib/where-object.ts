export const whereObject =
  (filters: ((obj: any) => boolean)[]) => (obj: any) => {
    return filters.every((filter) => filter(obj))
  }
