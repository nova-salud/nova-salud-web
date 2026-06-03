const fnIds = new WeakMap<object, number>()
let counter = 0

/**
 * Returns a stable numeric ID for a function reference.
 * Used to build React Query keys from memoized fetcher functions.
 * When a useCallback fetcher changes (deps changed), it gets a new ID → new query key → re-fetch.
 */
export const getFnId = (fn: object): number => {
  if (!fnIds.has(fn)) fnIds.set(fn, ++counter)
  return fnIds.get(fn)!
}
