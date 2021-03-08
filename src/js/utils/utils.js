const convertDate = (date) => {
  if (date) {
    const options = {
      year: 'numeric',
      day: 'numeric',
      month: 'long'
    }
    let d = new Date().toLocaleString('ru', options);
    return d
  }
  return '-'
}
export {
  convertDate
}
