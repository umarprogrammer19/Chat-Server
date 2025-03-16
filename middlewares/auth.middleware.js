import { asyncHandler } from "../utilities/asyncHandlers.js";
import ErrorHandler from "../utilities/errorHandlers.js";
import jwt from "jsonwebtoken";

export const isAuthenticatedUser = asyncHandler(async (req, res, next) => {
    let token = null;

    if (req.cookies && req.cookies.token) {
        token = req.cookies.token;
    }
    else if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
        token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
        return next(new ErrorHandler("Unauthorized: No Token Provided", 401));
    }

    try {
        const tokenData = jwt.verify(token, process.env.JWT_SECRET);
        req.user = tokenData;
        next();
    } catch (error) {
        return next(new ErrorHandler("Invalid or Expired Token", 401));
    }
});
