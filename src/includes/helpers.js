import { REMOVE_LOCALDATA_MIN } from './config'
export const AJAX = async (url) => {
  try {
    const res = await fetch(url)
    const data = await res.json()

    return data
  } catch (error) {
    throw Error(error)
  }
}

const now = new Date()
export const getLocalStorage = (key) => {
  const setTime = JSON.parse(localStorage.getItem(key))?.setTime
  const minutesDiff = (new Date(now).getTime() - new Date(setTime).getTime()) / 1000 / 60
  if (minutesDiff > REMOVE_LOCALDATA_MIN) localStorage.removeItem(key)

  const data = localStorage.getItem(key)
  return JSON.parse(data) || false
}

export const setLocalStorage = (key, data) => {
  localStorage.setItem(key, JSON.stringify({ ...data, setTime: now }))
}
