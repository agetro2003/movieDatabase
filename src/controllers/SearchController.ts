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

searchFilter = async (req: Request, res: Response): Promise<Response> => {
    const media_type = req.query.media_type || "all";
    const with_genre = req.query.with_genre || null;
    const sort_by = req.query.sort_by || null;
    const primary_release_year = req.query.primary_release_year || null;
    const year = req.query.year || null;
    const without_genres = req.query.without_genres || null;
    const page = req.query.page || null;
    const with_cast = req.query.with_cast || null;
    const query = ""
    const filters = { with_genre, sort_by, primary_release_year, year, without_genres, page, with_cast}
    for (const [key, value] of Object.entries(filters)) {
        if (value !== null) {
            query.concat(`&${key}=${value}`)
        }
    }
    if (media_type == "all") {
        try {
            const search = await AxiosInstance.get(`discover/movie?${query.slice(1)}`)
            const search2 = await AxiosInstance.get(`discover/tv?${query.slice(1)}`)
    
            const response: any[] | undefined = []
            search.data.results.forEach((result: any) => {
                response.push({
                    id: result.id,
                    name: result.title,
                    poster: `https://image.tmdb.org/t/p/w780${result.poster_path}`,
                    media_type: 'movie',
                    adult: result.adult,
                })
            })
            search2.data.results.forEach((result: any) => {
                response.push({
                    id: result.id,
                    name: result.name,
                    poster: `https://image.tmdb.org/t/p/w780${result.poster_path}`,
                    media_type: 'tv',
                    adult: result.adult,
                })
            })
    
            return this.successRes(res, 201, 'Success getting data', response)
        } catch (error) {
            return this.errorRes(res, 500, 'Internal server error', error) 
    
        }
    } else {
        try {
            const search = await AxiosInstance.get(`discover/${media_type}?${query.slice(1)}`)    
            const response: any[] | undefined = []
            search.data.results.forEach((result: any) => {
                response.push({
                    id: result.id,
                    name: result.title,
                    poster: `https://image.tmdb.org/t/p/w780${result.poster_path}`,
                    media_type: 'movie',
                    adult: result.adult,
                })
            })
          
    
            return this.successRes(res, 201, 'Success getting data', response)
        } catch (error) {
            return this.errorRes(res, 500, 'Internal server error', error) 
    
        }
    }
   
    
}
}

export default new SearchController();