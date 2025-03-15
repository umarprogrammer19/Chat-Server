import User from "../models/user.models.js";
import { asyncHandler } from "../utilities/asyncHandlers.js";
import { uploadImageToCloudinary } from "../utilities/cloudinary.js";
import ErrorHandler from "../utilities/errorHandlers.js";
import bcrypt from "bcrypt";

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


export const loginUser = asyncHandler(async (req, res, next) => {
    const { username, password } = req.body;

    if (!username || !password) return next(new ErrorHandler("Incorrect username and password", 400));

    const user = await User.findOne({ username });

    if (!user) return next(new ErrorHandler("Incorrect username and password", 400));

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return next(new ErrorHandler("Incorrect username and password", 400));

    res.status(200).json({
        success: true,
        message: "Login Successfull"
    })
})