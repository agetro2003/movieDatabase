import { Request, Response } from "express";
import BaseController from "./BaseController";
import { Movie } from "../models";
import AxiosInstance from "../config/axios";

class MovieController extends BaseController{
    getMovie = async (req: Request, res: Response): Promise<Response> => {
        const { id } = req.params;
        try {
            const movie = await Movie.findOne({MovieID: id});
            if (movie == null){
            const movie2 = await AxiosInstance.get(`movie/${id}?append_to_response=similar%2Cvideos%2Ccredits%2Crelease_dates`);
            const movieData = movie2.data;
            const trailer = movieData.videos.results.find((video: any) => video.type === "Trailer");
            const crew = movieData.credits.cast.map((person: any) => ({
                id: person.id,
                name: person.name,
                character: person.character,
                profile: `https://image.tmdb.org/t/p/w780/${person.profile_path}`,
            }));
            const similar = movieData.similar.results.map((movie: any) => ({
                id: movie.id,
                title: movie.title,
                poster: `https://image.tmdb.org/t/p/w780/${movie.poster_path}`,
                adult: movie.adult,
            }));
            const newMovie = new Movie({
                MovieID: id,
                title: movieData.title,
                overview: movieData.overview,
                poster: `https://image.tmdb.org/t/p/w780/${movieData.poster_path}`,
                backdrop: `https://image.tmdb.org/t/p/w780/${movieData.backdrop_path}`,
                trailer: `https://www.youtube.com/watch?v=${trailer.key}`,
                year: movieData.release_date.split("-")[0],
                genres: movieData.genres,
                crew: crew.slice(0, 10),
                similar: similar,
            });
            await newMovie.save();
            console.log("guardado")
            return this.successRes(res, 200, "Movie found", newMovie);
            }
            console.log('encontrado')
            return this.successRes(res, 200, "Movie found", movie);
        } catch (error) {
            return this.errorRes(res, 500, "Error getting movie", error);
        }
    }
}

export default new MovieController();