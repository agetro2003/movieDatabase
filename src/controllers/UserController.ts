import { Request, Response } from "express";
import { AuthRequest } from "../interfaces";
import BaseController from "./BaseController";
import { User } from "../models";


class UserController extends BaseController{
    updatePassword = async (req: Request, res: Response): Promise<Response> => {
    const userId = (req as AuthRequest).user._id;
   
    const { oldPassword, newPassword } = req.body;
    
    try {
        const user = await User.findById(userId);
        if (user == null){
            return this.errorRes(res, 404, "User not found");
        }

        const isMatch = await user.comparePassword(oldPassword);
        if (!isMatch) {
        return this.errorRes(res, 400, 'Invalid password');
      }

      user.password = newPassword;

      await user.save();

      return this.successRes(res, 200, 'Password updated successfully');
    } catch (error) {
        return this.errorRes(res, 500, "Error updating password", error);
    }
    }
}
    
export default new UserController();