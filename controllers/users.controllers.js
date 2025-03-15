import User from "../models/user.models.js";
import { asyncHandler } from "../utilities/asyncHandlers.js";
import { uploadImageToCloudinary } from "../utilities/cloudinary.js";
import ErrorHandler from "../utilities/errorHandlers.js";

export const registerUser = asyncHandler(async (req, res, next) => {
    const { fullname, username, password, gender } = req.body;

    if (!fullname || !username || !password || !gender) {
        return next(new ErrorHandler("All Fields Are Required", 400));
    }

    const user = await User.findOne({ username });

    if (user) return next(new ErrorHandler("User already exists", 400));

    let avatar;

    if (req.file) {
        avatar = await uploadImageToCloudinary(req.file.path);
    } else {
        const avatarType = gender === "male" ? "boy" : "girl";
        avatar = `https://avatar.iran.liara.run/public/${avatarType}?username=${username}`;
    }

    const newUser = await User.create({
        fullname,
        username,
        password,
        gender,
        avatar
    });

    res.status(201).json({
        sucess: true,
        message: "Registration Successfull",
        newUser
    });
});
