import Message from "../models/message.models.js";
import Conversation from "../models/conversation.models.js";
import { asyncHandler } from "../utilities/asyncHandlers.js";
import ErrorHandler from "../utilities/errorHandlers.js";

export const sendMessage = asyncHandler(async (req, res, next) => {
    if (!req.user) return next(new ErrorHandler("Unauthorized", 401));

    const senderId = req.user._id;

    if (!senderId) return next(new ErrorHandler("User Not Found", 404));

    const receiverId = req.params.receiverId;
    const { message } = req.body;

    if (!receiverId || !message) return next(new ErrorHandler("Incomplete Data", 400));

    let conversation = Conversation.findOne({
        participants: { $all: { senderId, receiverId } },
    });

    if (!conversation) {
        conversation = await Conversation.create({
            participants: [senderId, receiverId],
        });
    };

    const newMessage = await Message.create({
        senderId,
        receiverId,
        message
    });

    if (newMessage) {
        conversation.message.push(newMessage._id);
        await conversation.save();
    };

    res.status(201).json({
        sucess: true,
        newMessage,
    });
});