// Add a zero to day or month if it's only one digit 
addZero = str => str < 10 ? '0' + str : str;

// ------------------------------------------------------------

// Get string in yyyy-mm-dd format from Date object
module.exports.dateToString = dateObject =>
    dateObject.getFullYear() + '-' + addZero(dateObject.getMonth() + 1) + '-' + addZero(dateObject.getDate());

// ------------------------------------------------------------

// Get today date in yyyy-mm-dd format
module.exports.dateToday = () =>
this.dateToString(new Date());

// ------------------------------------------------------------

module.exports.datePlus2 = (dateString) => {
    const dateY = parseInt(dateString.split('-')[0]);
    const dateM = parseInt(dateString.split('-')[1]);
    const dateD = parseInt(dateString.split('-')[2]);

    const date2 = dateM > 10 ? ((dateY + 1) + '-' + addZero(dateM - 10) + '-' + addZero(dateD)) : (dateY + '-' + addZero(dateM + 2) + '-' + addZero(dateD));
    return date2;
}

// ------------------------------------------------------------

// Returns a boolean indicating if date is of today or a future day
module.exports.dateNotPast = dateString =>
    this.dateToday().localeCompare(dateString) < 1;

// ------------------------------------------------------------
    
// Tries to find out if the given date exists in reality
module.exports.dateExists = dateString =>
    dateString == this.dateToString(new Date(dateString));

// ------------------------------------------------------------

// Add months
module.exports.dateAddMonths = (dateString, months) => {
    const dateObject = new Date(dateString);
    const dateAdd = dateObject.setMonth(dateObject.getMonth() + months);
    return this.dateToString(new Date(dateAdd));
}

// ------------------------------------------------------------