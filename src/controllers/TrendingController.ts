import { Request, Response } from "express";
import BaseController from "./BaseController";
import AxiosInstance from "../config/axios";


class TrendingController extends BaseController {
    getTrendings = async (req: Request, res: Response): Promise<Response> => {
        const { type, time } = req.params
        const language = req.query.language || 'en-US'
        const page = req.query.page || 1
        try {
        const trendings = await AxiosInstance.get(`trending/${type}/${time}?language=${language}&page=${page}`)
        return this.successRes(res, 201, 'Success getting data', trendings.data)
    } catch (error) {
       return this.errorRes(res, 500, 'Internal server error', error) 
    }    
    }

}

export default new TrendingController();