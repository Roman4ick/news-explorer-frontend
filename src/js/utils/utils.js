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
  let d = new Date(date.getTime() - (days * 24 * 60 * 60 * 1000))
  let dd = d.getDate() > 9 ? d.getDate() : '0' + d.getDate()
  let mm = (d.getMonth() + 1) > 9 ? d.getMonth() + 1 : '0' + (d.getMonth() + 1)
  let yyyy = d.getFullYear()
  return `${yyyy}-${mm}-${dd}`
}

const daysAfter = () => {
  let d = new Date()
  let dd = d.getDate() > 9 ? d.getDate() : '0' + d.getDate()
  let mm = (d.getMonth() + 1) > 9 ? d.getMonth() + 1 : '0' + (d.getMonth() + 1)
  let yyyy = d.getFullYear()
  return `${yyyy}-${mm}-${dd}`
}

export {
  convertDate,
  daysBefore,
  daysAfter
}
