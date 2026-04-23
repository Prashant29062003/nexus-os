/**
 * Standardized success response
 * @param {Object} res - Express response object
 * @param {Number} statusCode - HTTP status code
 * @param {String} message - Success message
 * @param {Object} data - Response data
 */
export const sendSuccess = (res, statusCode, message, data = null) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

/**
 * Standardized error response
 * @param {Object} res - Express response object
 * @param {Number} statusCode - HTTP status code
 * @param {String} message - Error message
 * @param {Object} errors - Validation errors or additional error details
 */
export const sendError = (res, statusCode, message, errors = null) => {
  return res.status(statusCode).json({
    success: false,
    message,
    errors,
  });
};

/**
 * Send 200 OK response
 */
export const sendOk = (res, message = 'Success', data = null) => {
  return sendSuccess(res, 200, message, data);
};

/**
 * Send 201 Created response
 */
export const sendCreated = (res, message = 'Resource created successfully', data = null) => {
  return sendSuccess(res, 201, message, data);
};

/**
 * Send 400 Bad Request response
 */
export const sendBadRequest = (res, message = 'Bad Request', errors = null) => {
  return sendError(res, 400, message, errors);
};

/**
 * Send 401 Unauthorized response
 */
export const sendUnauthorized = (res, message = 'Unauthorized access') => {
  return sendError(res, 401, message);
};

/**
 * Send 403 Forbidden response
 */
export const sendForbidden = (res, message = 'Forbidden - Access denied') => {
  return sendError(res, 403, message);
};

/**
 * Send 404 Not Found response
 */
export const sendNotFound = (res, message = 'Resource not found') => {
  return sendError(res, 404, message);
};

/**
 * Send 500 Internal Server Error response
 */
export const sendServerError = (res, message = 'Internal server error') => {
  return sendError(res, 500, message);
};
