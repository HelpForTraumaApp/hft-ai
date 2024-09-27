export const debounce = <T extends any[]>(
  fn: (...args: T) => void,
  timeout: number
) => {
  let handle = 0
  let lastArgs: T
  const ret = (...args: T) => {
    lastArgs = args
    clearTimeout(handle)
    handle = window.setTimeout(() => fn(...args), timeout)
  }
  ret.flush = () => {
    clearTimeout(handle)
    if (lastArgs) {
      fn(...lastArgs)
    }
  }
  ret.cancel = () => {
    clearTimeout(handle)
  }
  return ret
}
