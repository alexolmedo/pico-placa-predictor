function handleClick () {

  var licensePlate = $('#licensePlateNumber').val()
  var lastdigit = licensePlate[licensePlate.length - 1]

  var dateTimeRoadString = $('#dateTimeRoad').val()
  var dateTimeRoad = moment(dateTimeRoadString, moment.DATETIME_LOCAL)

  if (!dateTimeRoad.isValid()) {
    console.log('Invalid time')
  }
  console.log(hasPicoPlaca(lastdigit, dateTimeRoad))

}

function hasPicoPlaca (lastDigit, dateTimeRoad) {
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