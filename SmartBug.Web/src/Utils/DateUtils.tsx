import { differenceInDays, differenceInMinutes } from 'date-fns'

export const initDateIsFirstThanEndDate = (date1:any, date2:any) => {
  const normalizedDate1 = new Date(date1.getFullYear(), date1.getMonth() - 1, date1.getDate())
  const normalizedDate2 = new Date(date2.getFullYear(), date2.getMonth() - 1, date2.getDate())
  const isFirst = differenceInDays(normalizedDate1, normalizedDate2)
  return isFirst <= 0
}

export const initTimeIsFirstThanEndTime = (time1:any, time2:any) => {
  const normalizedTime1 = new Date('2000/01/01 ' + time1)
  const normalizedTime2 = new Date('2000/01/01 ' + time2)
  const isFirst = differenceInMinutes(normalizedTime1, normalizedTime2)
  return isFirst <= 0
}

export const timeFormatFromDateString = (dateTime:any) => {
  if (typeof dateTime !== 'string') {
    dateTime = dateTime.toJSON()
  }
  const convertedDateTime = new Date(dateTime.replace('Z', ''))
  const timeZone = convertedDateTime.getTimezoneOffset() / 60
  convertedDateTime.setHours(convertedDateTime.getHours() - timeZone)
  const formatedDateString = convertedDateTime.toLocaleTimeString('pt-Br', { hour: 'numeric', hour12: false, minute: 'numeric' })
  return formatedDateString
}

export const formatMillisecondsToTimeString = (timeInMilliseconds:any, isSeconds = false) => {
  if (!timeInMilliseconds) {
    return '00:00:00'
  }

  if (isSeconds) {
    timeInMilliseconds = timeInMilliseconds * 1000
  }

  // let milliseconds = parseInt((timeInMilliseconds % 1000) / 100)
  let seconds = Math.floor(timeInMilliseconds / 1000)
  let minutes = Math.floor(seconds / 60)
  let hours = Math.floor(minutes / 60)

  seconds = seconds % 60
  // 👇️ if seconds are greater than 30, round minutes up (optional)
  minutes = seconds >= 30 ? minutes + 1 : minutes

  minutes = minutes % 60

  // return `${padToNDigits(hours)}:${padToNDigits(minutes)}:${padToNDigits(seconds)}.${padToNDigits(milliseconds)}`
  return `${padToNDigits(hours)}:${padToNDigits(minutes)}:${padToNDigits(seconds)}`
}

export const getHourMinuteSecondMilisecondFormatedFromDateNow = () => {
  const d = new Date()
  const now = `${padToNDigits(d.getHours())}:${padToNDigits(d.getMinutes())}:${padToNDigits(d.getSeconds())}:${padToNDigits(d.getMilliseconds(), 3)}`
  return now
}

function padToNDigits(num:any, digits = 2) {
  return num.toString().padStart(digits, '0')
}


export const convertDateTime = (inputStr:any) => {
  // Parse the input string into a Date object
  const date = new Date(inputStr);

  // Subtrai 3 horas da data (3 horas = 10800000 milissegundos)
  date.setTime(date.getTime() - (3 * 60 * 60 * 1000));

  // Extrai as partes da data
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Janeiro é 0!
  const year = date.getFullYear();

  // Extrai as partes da hora
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  // Formata a data e a hora no formato 'dd/mm/yyyy hh:mm:ss'
  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
}
