class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.status = false;

        // Isse stack trace clean rehta hai (pata chalta hai error kahan se aaya)
        Error.captureStackTrace(this, this.constructor);
    }
}

export default AppError;