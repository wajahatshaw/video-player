
import moment from 'moment'

export const formatTimeStampToDate = (timeStamp, format = "DD, MMMM YYYY") => {
  if (!timeStamp) return 'No Date'
  const timeWithFormat = moment(timeStamp).format(format);
  // console.log(moment(timeStamp).format("DD, MMMM YYYY"))
  //console.log(moment(timeStamp).tz().format('Z z'))
  // console.log(timeWithFormat)
  return timeWithFormat;
}
