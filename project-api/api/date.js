// Add a zero to day or month if it's only one digit 
addZero = str => str < 10 ? str + '0' : str;


// Get string in yyyy-mm-dd format from Date object
module.exports.dateToString = dateObject =>
    dateObject.getFullYear() + '-' + addZero(dateObject.getMonth() + 1) + '-' + addZero(dateObject.getDate());


// Get today date in yyyy-mm-dd format
module.exports.dateToday = () =>
    this.dateToString(new Date());


// Returns a boolean indicating if date is of today or a future day
module.exports.dateNotPast = dateString =>
    this.today().localeCompare(dateString) < 1;


// Tries to find out if the given date exists in reality
module.exports.dateExists = dateString =>
    dateString == this.dateToString(new Date(dateString));


// Add months
module.exports.dateAddMonths = (dateString, months) => {
    const dateObject = new Date(dateString);
    const dateAdd = dateObject.setMonth(dateObject.getMonth() + months);
    return this.dateToString(dateAdd);
}
