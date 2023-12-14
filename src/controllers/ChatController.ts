import { Request, Response } from "express";
import BaseController from "./BaseController";
import { Chat, Message, User } from "../models";
import { AuthRequest } from "../interfaces";
import { use } from "passport";

class ChatController extends BaseController {
  createChat = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { name, userId } = req.body;
      const mainUserId = (req as AuthRequest).user._id;
      let usersId = [];
      if (userId) {
        if (userId == mainUserId) {
          return this.errorRes(
            res,
            400,
            "You can't create a chat with yourself"
          );
        }

        const check = await Chat.findOne({ usersId: [mainUserId, userId] });
        if (check) {
          return this.errorRes(res, 400, "Chat already exists", check);
        }

        const user = await User.findById(userId);
        if (!user) {
          return this.errorRes(res, 400, "User not found");
        }
        usersId.push(userId);
        usersId.push(mainUserId);
      }

      const chat = new Chat({
        usersId: usersId,
        name: usersId.length > 0 ? null : name,
        isPrivate: usersId.length > 0 ? true : false,
      });
      await chat.save();
      return this.successRes(res, 200, "Chat created", chat);
    } catch (error) {
        console.log(error)
      return this.errorRes(res, 500, "Error creating chat", error);
    }
  };

  addUserToChats = async (req: Request, res: Response): Promise<Response> => {
    const { userId } = req.body;
    try {
      if (!userId) {
        return this.errorRes(res, 400, "User Id is required");
      }
      const user = User.findById(userId);
      if (!user) {
        return this.errorRes(res, 400, "User not found");
      }
      await Chat.updateMany({isPrivate: false}, {$push: {usersId: userId}});
        return this.successRes(res, 200, "User added to chats");
    } catch (error) {
      return this.errorRes(res, 500, "Error adding user to chat", error);
    }
  };

  getUserChats = async (req: Request, res: Response): Promise<Response> => {
    try {
      const userId = (req as AuthRequest).user._id;
      const chats = await Chat.find({ usersId: userId, isPrivate: true });
      return this.successRes(res, 200, "Chats found", chats);
    } catch (error) {
      return this.errorRes(res, 500, "Error getting chats", error);
    }
  };

  getPublicChats = async (req: Request, res: Response): Promise<Response> => {
    try {
      const chats = await Chat.find({ isPrivate: false });
      return this.successRes(res, 200, "Chats found", chats);
    } catch (error) {
      return this.errorRes(res, 500, "Error getting chats", error);
    }
  }  

  getDetailChat = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { id } = req.params;
      const chat = await Chat.findById(id);
      const messages = await Message.find({ chatId: id }).populate({
        path: "userId",
        select: "-password -email -createdAt -updatedAt",
      }).sort({createdAt: -1});
      return this.successRes(res, 200, "Chat found", {chat, messages});
    } catch (error) {
      return this.errorRes(res, 500, "Error getting chat", error);
    }
  };

  getAllChats = async (req: Request, res: Response): Promise<Response> => {
    try {
      const chats = await Chat.find();
      return this.successRes(res, 200, "Chats found", chats);
    } catch (error) {
      return this.errorRes(res, 500, "Error getting chats", error);
    }
  };

}

export default new ChatController();