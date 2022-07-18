type PlatformType = 'JavaScriptCore' | 'Hermes' | 'NodeJs' | 'Browser'
type Environment = 'NodeJs' | 'NativeMobile' | 'Browser'

const _PlatformType: PlatformType = (function (): PlatformType {
  const isReactNative = globalThis?.navigator?.product === 'ReactNative'
  if (isReactNative) {
    try {
      // check if exists (or throw error)
      // eslint-disable-next-line @typescript-eslint/no-var-requires, @typescript-eslint/no-unused-vars
      const reactNative = require('react-native')
      const usingHermes = typeof HermesInternal === 'object' && HermesInternal !== null
      if (usingHermes) return 'Hermes'
      return 'JavaScriptCore'
    } catch (error) {
      // do nothing
    }
  }
  if (typeof globalThis.document !== 'undefined') {
    return 'Browser'
  }
  return 'NodeJs'
})()

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const isRunningOnNodeJs = _PlatformType === 'NodeJs'
const isRunningOnNativeMobile = _PlatformType === 'JavaScriptCore' || _PlatformType === 'Hermes'
const isRunningOnBrowser = _PlatformType === 'Browser'

const _Environment: Environment = isRunningOnNativeMobile
  ? 'NativeMobile'
  : isRunningOnBrowser
    ? 'Browser'
    : 'NodeJs'

export default {
  PlatformType: _PlatformType,
  Environment: _Environment
}
