export function onlyDebugLog() {
  if (__DEV__) {
    console.log.apply(this, arguments)
  }
}
