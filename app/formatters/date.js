export const toString = (date) => {
  const takeZero = (num) => {
    return num < 10 ? '0'+num : num
  }
  let fDate = date.split("")
  fDate[10] = 'T'
  fDate = new Date(fDate.join(""))
  const year = fDate.getFullYear()
  const month = fDate.getMonth() + 1
  const day = fDate.getDate()
  const hours = fDate.getHours()
  const minutes = fDate.getMinutes()
  
  return `${takeZero(day)}.${takeZero(month)}.${year} ${hours}:${minutes}`
};