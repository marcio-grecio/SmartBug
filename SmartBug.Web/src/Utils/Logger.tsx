import { devMode } from './GlobalConstantes'
import { getHourMinuteSecondMilisecondFormatedFromDateNow } from './DateUtils'

export const log = (...args: unknown[]) => {
  if (devMode) {
    console.log(`\x1b[36m[SmartBug Log] - ${getHourMinuteSecondMilisecondFormatedFromDateNow()}\x1b[0m`, ...args)
  }
}

export const infoLog = (...args: unknown[]) => {
  if (devMode) {
    console.info(`\x1b[33m[SmartBug Info] - ${getHourMinuteSecondMilisecondFormatedFromDateNow()}\x1b[0m`, ...args)
  }
}

export const warnLog = (...args: unknown[]) => {
  console.warn(`\x1b[33m[SmartBug Warn] - ${getHourMinuteSecondMilisecondFormatedFromDateNow()}\x1b[0m`, ...args)
}

export const errorLog = (...args: unknown[]) => {
  console.error(`\x1b[31m[SmartBug Error] - ${getHourMinuteSecondMilisecondFormatedFromDateNow()}\x1b[0m`, ...args)
}
