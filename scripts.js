function handleClick () {

  // Check valid license
  var licensePlateString = $('#licensePlateNumber').val()
  if (!licensePlateIsValid(licensePlateString)) {
    alert('The license plate is invalid')
    return
  }

  // Check valid time
  var dateTimeString = $('#dateTime').val()
  var dateTime = moment(dateTimeString, moment.DATETIME_LOCAL)
  if (!dateTime.isValid()) {
    alert('The date and time are invalid')
    return
  }

  var lastdigit = parseInt(licensePlateString[licensePlateString.length - 1])
  console.log(hasPicoPlaca(lastdigit, dateTime))

}

const hasPicoPlaca = (lastDigit, dateTime) => {
  var timeOnly = moment(dateTime.format('HH:mm'), 'HH:mm')
  var morningStart = moment('07:00', 'HH:mm')
  var morningEnd = moment('09:30', 'HH:mm')
  var afternoonStart = moment('16:00', 'HH:mm')
  var afternoonEnd = moment('19:30', 'HH:mm')

  var rules = {
    'Monday': [1, 2],
    'Tuesday': [3, 4],
    'Wednesday': [5, 6],
    'Thursday': [7, 8],
    'Friday': [9, 0],
    'Saturday': [],
    'Sunday': []
  }

  if (timeOnly.isBetween(morningStart, morningEnd) || timeOnly.isBetween(afternoonStart, afternoonEnd)) {
    var dayOfWeek = dateTime.format('dddd')
    return rules[dayOfWeek].indexOf(lastDigit) >= 0
  } else {
    return false
  }
}

const licensePlateIsValid = (licensePlateString) => {
  // Check if plates are in format ABC-1234 or AB-1234, case insensitive
  return licensePlateString.match(/^[A-Za-z]{3}-[0-9]{4}$|^[A-Za-z]{2}-[0-9]{4}$/)
}