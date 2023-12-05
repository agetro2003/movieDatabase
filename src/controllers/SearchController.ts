import { Request, Response } from "express";
import BaseController from "./BaseController";
import AxiosInstance from "../config/axios";


class SearchController extends BaseController {
   
searchByText = async (req: Request, res: Response): Promise<Response> => {

const { query } = req.query
const includeAdult = req.query.include_adult || false
const page = req.query.page || 1
try {
    const search = await AxiosInstance.get(`search/multi?query=${query}&include_adult=${includeAdult}&page=${page}`)
const response = search.data.results.filter((result: any) => result.media_type !== 'person') 

    return this.successRes(res, 201, 'Success getting data', response)

} catch (error) {
    return this.errorRes(res, 500, 'Internal server error', error) 

}

}
}

export default new SearchController();