import { asyncHandler } from "../utilities/asyncHandlers.js";
import ErrorHandler from "../utilities/errorHandlers.js";

export const registerUser = asyncHandler((req, res, next) => {
    const { fullname, username, password, gender } = req.body;
    if (!fullname || !username || !password || !gender) {
        return next(new ErrorHandler("All Fields Are Required", 400));
    }
    res.send(fullname);
});
