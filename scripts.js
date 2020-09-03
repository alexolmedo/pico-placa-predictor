function handleClick () {

  //Check valid license
  var licensePlateString = $('#licensePlateNumber').val()
  if (!licensePlateIsValid(licensePlateString)) {
    alert('The license plate is invalid')
    return
  }

  var dateTimeRoadString = $('#dateTimeRoad').val()
  var dateTimeRoad = moment(dateTimeRoadString, moment.DATETIME_LOCAL)
  if (!dateTimeRoad.isValid()) {
    alert('The date and time are invalid')
    return
  }

  var lastdigit = licensePlateString[licensePlateString.length - 1]
  console.log(hasPicoPlaca(lastdigit, dateTimeRoad))

}

const hasPicoPlaca = (lastDigit, dateTimeRoad) => {
  var timeOnly = moment(dateTimeRoad.format('HH:mm'), 'HH:mm')
  var morningStart = moment('07:00', 'HH:mm')
  var morningEnd = moment('09:30', 'HH:mm')
  var afternoonStart = moment('16:00', 'HH:mm')
  var afternoonEnd = moment('19:30', 'HH:mm')

  if (timeOnly.isBetween(morningStart, morningEnd) || timeOnly.isBetween(afternoonStart, afternoonEnd)) {
    return true
  } else {
    return false
  }
}

const licensePlateIsValid = (licensePlateString) => {
  // Check if plates are in format ABC-1234 or AB-1234, case insensitive
  return licensePlateString.match(/^[A-Za-z]{3}-[1-9]{4}$|^[A-Za-z]{2}-[1-9]{4}$/)
}