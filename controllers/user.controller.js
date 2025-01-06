import User from "../models/user.model.js";
import mongoose from "mongoose";

export const getUserSavedPosts = async (req, res) => {
    const clerkUserId = req.auth.userId;

    if (!clerkUserId) {
        return res.status(401).json("Not authenticated!");
    }

    const user = await User.findOne({ clerkUserId });
    if (!user) {
        return res.status(404).json("User not found!");
    }

    res.status(200).json(user.savedPosts);
};

export const savePost = async (req, res) => {
    const clerkUserId = req.auth.userId;
    const postId = req.body.postId;

    if (!clerkUserId) {
        return res.status(401).json("Not authenticated!");
    }

    const user = await User.findOne({ clerkUserId });

    const isSaved = user.savedPosts.some((p) => p.toString() === postId);

    if (!isSaved) {
        await User.findByIdAndUpdate(user._id, {
            $push: { savedPosts: new mongoose.Types.ObjectId(postId) },
        });
    } else {
        await User.findByIdAndUpdate(user._id, {
            $pull: { savedPosts: postId },
        });
    }

    res.status(200).json(isSaved ? "Post unsaved" : "Post saved");
};
