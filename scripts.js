function handleClick () {
  $('.alert-danger, .alert-success').addClass('d-none')

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

  if (hasPicoPlaca(licensePlateString, dateTimeString)) {
    $('.alert-danger').toggleClass('d-none')
  } else {
    $('.alert-success').toggleClass('d-none')
  }
}

const hasPicoPlaca = (licensePlateString, dateTimeString) => {

  var lastDigit = parseInt(licensePlateString[licensePlateString.length - 1])
  var dateTime = moment(dateTimeString, moment.DATETIME_LOCAL)

  var rules = {
    'Monday': [1, 2],
    'Tuesday': [3, 4],
    'Wednesday': [5, 6],
    'Thursday': [7, 8],
    'Friday': [9, 0],
    'Saturday': [],
    'Sunday': []
  }
  var morningStart = moment('07:00', 'HH:mm')
  var morningEnd = moment('09:30', 'HH:mm')
  var afternoonStart = moment('16:00', 'HH:mm')
  var afternoonEnd = moment('19:30', 'HH:mm')

  var timeOnly = moment(dateTime.format('HH:mm'), 'HH:mm')
  if (timeOnly.isBetween(morningStart, morningEnd) || timeOnly.isBetween(afternoonStart, afternoonEnd)) {
    var dayOfWeek = dateTime.format('dddd')
    return rules[dayOfWeek].indexOf(lastDigit) >= 0
  }
  return false
}

const licensePlateIsValid = (licensePlateString) => {
  // Check if plates are in format ABC-1234 or AB-1234, case insensitive
  return licensePlateString.match(/^[A-Za-z]{3}-[0-9]{4}$|^[A-Za-z]{2}-[0-9]{4}$/)
}