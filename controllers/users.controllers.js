import { errorHandler } from "../utilities/errorHandlers.js";

const registerUser = async (req, res) => {
    try {
        const { fullname, username, password, gender } = req.body;
        if (!fullname || !username || !password || !gender) return next(new errorHandler("All Fields Are Required", 400));
    } catch (error) {
    }
}