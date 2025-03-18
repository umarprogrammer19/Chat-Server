import Message from "../models/message.models.js";
import Conversation from "../models/conversation.models.js";
import { asyncHandler } from "../utilities/asyncHandlers.js";
import ErrorHandler from "../utilities/errorHandlers.js";

// Send Messages API
export const sendMessage = asyncHandler(async (req, res, next) => {
    if (!req.user) return next(new ErrorHandler("Unauthorized", 401));

    const senderId = req.user._id;
    if (!senderId) return next(new ErrorHandler("User Not Found", 404));

    const receiverId = req.params.receiverId;
    const { message } = req.body;

    if (!receiverId || !message) return next(new ErrorHandler("Incomplete Data", 400));

    let conversation = await Conversation.findOne({
        participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
        conversation = await Conversation.create({
            participants: [senderId, receiverId],
            messages: []
        });
    }

    const newMessage = await Message.create({
        senderId,
        receiverId,
        message
    });

    conversation.messages.push(newMessage._id);
    await conversation.save();

    res.status(201).json({
        success: true,
        newMessage,
    });
});

// Get Messages API
export const getMessages = asyncHandler(async (req, res, next) => {
    if (!req.user) return next(new ErrorHandler("Unauthorized", 401));

    const userId = req.user._id;
    if (!userId) return next(new ErrorHandler("User Not Found", 404));

    const participantId = req.params.participantId;

    if (!userId || !participantId) return next(new ErrorHandler("Incomplete Data", 400));

    const conversation = await Conversation.findOne({
        participants: { $all: [userId, participantId] },
    }).populate("messages");

    res.status(201).json({
        success: true,
        conversation,
    });
})