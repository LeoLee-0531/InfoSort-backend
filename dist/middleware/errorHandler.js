"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.HttpError = void 0;
// Define a custom HttpError class
class HttpError extends Error {
    constructor(status, message) {
        super(message);
        this.status = status;
        // Set the prototype explicitly to ensure instanceof works correctly
        Object.setPrototypeOf(this, HttpError.prototype);
    }
}
exports.HttpError = HttpError;
const errorHandler = (err, // Allow err to be HttpError
_req, res, _next // _next is declared but not used, which is fine for Express error handlers
) => {
    console.error(err.stack); // Log the full error stack
    if (err instanceof HttpError) {
        res.status(err.status).json({
            error: err.name, // Or a more generic error title
            message: err.message,
        });
    }
    else {
        // Handle generic errors
        res.status(500).json({
            error: 'Internal Server Error',
            message: process.env.NODE_ENV === 'development' ? err.message : 'An unexpected error occurred',
        });
    }
};
exports.errorHandler = errorHandler;
