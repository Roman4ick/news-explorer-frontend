const convertDate = (date) => {
  if (date) {
    const options = {
      year: 'numeric',
      day: 'numeric',
      month: 'long'
    }
    return new Date(date).toLocaleString('ru', options)
  }
  return '-'
}
const daysBefore = (days) => {
  const date = new Date()
  return new Date(date.getTime() - (days * 24 * 60 * 60 * 1000)).getTime()
}

export {
  convertDate,
  daysBefore
}
