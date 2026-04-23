import { sendForbidden } from '#utils/apiResponse.js';

/**
 * Ensure the authenticated user owns the resource
 * This middleware should be used after authenticate middleware
 * The resource must have a userId field
 */
export const isOwner = (resource) => {
  return (req, res, next) => {
    const userId = req.user._id.toString();
    const resourceUserId = resource.userId?.toString();

    if (!resourceUserId) {
      return sendForbidden(res, 'Resource has no owner');
    }

    if (userId !== resourceUserId) {
      return sendForbidden(res, 'Access denied - You do not own this resource');
    }

    next();
  };
};

/**
 * Middleware factory to check ownership from request params
 * Usage: isOwnerParam('taskId') will check req.task.userId
 */
export const isOwnerParam = (paramName) => {
  return (req, res, next) => {
    const userId = req.user._id.toString();
    const resource = req[paramName];

    if (!resource) {
      return sendNotFound(res, 'Resource not found');
    }

    const resourceUserId = resource.userId?.toString();

    if (!resourceUserId) {
      return sendForbidden(res, 'Resource has no owner');
    }

    if (userId !== resourceUserId) {
      return sendForbidden(res, 'Access denied - You do not own this resource');
    }

    next();
  };
};

export default isOwner;
