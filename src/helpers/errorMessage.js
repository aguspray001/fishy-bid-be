exports.errorMessage = (message, errorStatus) =>{
    const e = new Error()
    e.message = message
    e.errorStatus = errorStatus
    throw e; //throw untuk membuang error, return untuk data
}