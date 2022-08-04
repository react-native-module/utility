type EngineType = 'JavaScriptCore' | 'Hermes' | 'NodeJs' | 'Browser'
type EnvironmentType = 'NodeJs' | 'NativeMobile' | 'Browser'

const PlatformType: EngineType = (function (): EngineType {
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
const isRunningOnNodeJs = PlatformType === 'NodeJs'
const isRunningOnNativeMobile = PlatformType === 'JavaScriptCore' || PlatformType === 'Hermes'
const isRunningOnBrowser = PlatformType === 'Browser'

const Environment: EnvironmentType = isRunningOnNativeMobile
  ? 'NativeMobile'
  : isRunningOnBrowser
    ? 'Browser'
    : 'NodeJs'

export {
  PlatformType,
  Environment
}
