import React from "react"
// import DateTimePicker from 'react-datetime-picker' // https://www.npmjs.com/package/react-datetime-picker


<DateTimePicker
    amPmAriaLabel="Select AM/PM"
    calendarAriaLabel="Toggle calendar"
    clearAriaLabel="Clear value"
    dayAriaLabel="Day"
    hourAriaLabel="Hour"
    maxDetail="second"
    minuteAriaLabel="Minute"
    monthAriaLabel="Month"
    nativeInputAriaLabel="Date and time"
    onChange={onChangeDateTime}
    secondAriaLabel="Second"
    value={value}
    yearAriaLabel="Year"
    maxDetail="minute"
    calendarIcon={null}
    minDate={new Date()}
    className="dateTime"
/>