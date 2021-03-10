export default () => {
  const dt = new Date()
  const year = dt.getFullYear()
  let month = dt.getMonth() + 1
  let day = dt.getDate()

  if (day < 10) {
    day = '0' + day
  }
  if (month < 10) {
    month = '0' + month
  }

  return `${year}-${month}-${day}`
}
