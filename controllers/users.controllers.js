import User from "../models/user.models.js";
import { asyncHandler } from "../utilities/asyncHandlers.js";
import { uploadImageToCloudinary } from "../utilities/cloudinary.js";
import ErrorHandler from "../utilities/errorHandlers.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser = asyncHandler(async (req, res, next) => {
    const { fullname, username, password, gender } = req.body;

    if (!fullname || !username || !password || !gender) {
        return next(new ErrorHandler("All Fields Are Required", 400));
    }

    const user = await User.findOne({ username });

    if (user) return next(new ErrorHandler("User already exists", 400));

    let avatar;

    if (req.file) {
        const cloudinaryResponse = await uploadImageToCloudinary(req.file.path);
        avatar = cloudinaryResponse?.secure_url || cloudinaryResponse?.url;
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

    const tokenData = {
        _id: newUser?._id
    };
    const token = jwt.sign(tokenData, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    });

    res.status(201).cookie("token", token, {
        expires: new Date(Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: 'None'
    }).json({
        success: true,
        message: "Registration Successful",
        newUser,
        token
    });
});


export const loginUser = asyncHandler(async (req, res, next) => {
    const { username, password } = req.body;

    if (!username || !password) return next(new ErrorHandler("Incorrect username and password", 400));

    const user = await User.findOne({ username });

    if (!user) return next(new ErrorHandler("Incorrect username and password", 400));

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return next(new ErrorHandler("Incorrect username and password", 400));

    const tokenData = {
        _id: user?._id
    };
    const token = jwt.sign(tokenData, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    });
    res.status(200).cookie("token", token, {
        expires: new Date(Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: 'None'
    }).json({
        success: true,
        message: "Login Successfull",
        token
    })
})