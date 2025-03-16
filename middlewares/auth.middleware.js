import { asyncHandler } from "../utilities/asyncHandlers.js";
import ErrorHandler from "../utilities/errorHandlers.js";
import jwt from "jsonwebtoken";

export const isAuthenticatedUser = asyncHandler(async (req, res, next) => {
    const token = req.cookies.token || req.headers["authorization"].replace("Bearer ", "");

    if (!token) return next(new ErrorHandler("Unauthorized", 400));

    const tokenData = jwt.verify(token, process.env.JWT_SECRET);

    req.user = tokenData;
})