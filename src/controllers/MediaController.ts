import { Request, Response } from "express";
import BaseController from "./BaseController";
import { Media } from "../models";
import AxiosInstance from "../config/axios";

class MediaController extends BaseController {
  getMedia = async (req: Request, res: Response): Promise<Response> => {
    const { mediaType, id } = req.params;
    try {
      const media = await Media.findOne({ MediaID: id });
      if (media == null) {
        const media2 = await AxiosInstance.get(
          `${mediaType}/${id}?append_to_response=similar%2Cvideos%2Ccredits%2Crelease_dates`
        );
        const mediaData = media2.data;
        const trailer = mediaData.videos.results.find(
          (video: any) => video.type === "Trailer"
        );
        const cast = mediaData.credits.cast.map((person: any) => ({
          id: person.id,
          name: person.name,
          character: person.character,
          profile: `https://image.tmdb.org/t/p/w780/${person.profile_path}`,
        }));
        const similar = mediaData.similar.results.map((media: any) => ({
          id: media.id,
          title: media.title || media.name,
          poster: `https://image.tmdb.org/t/p/w780/${media.poster_path}`,
          adult: media.adult,
        }));
        const newmedia = new Media({
          MediaID: id,
          title: mediaData.title || mediaData.name,
          overview: mediaData.overview,
          poster: `https://image.tmdb.org/t/p/w780/${mediaData.poster_path}`,
          backdrop: `https://image.tmdb.org/t/p/w780/${mediaData.backdrop_path}`,
          trailer: `https://www.youtube.com/watch?v=${trailer.key}`,
          year: mediaData.release_date
            ? mediaData.release_date.split("-")[0]
            : mediaData.first_air_date.split("-")[0],
          genres: mediaData.genres,
          cast: cast.slice(0, 10),
          similar: similar,
          mediaType: mediaType,
        });
        await newmedia.save();
        console.log("guardado");
        return this.successRes(res, 200, "media found", newmedia);
      }
      console.log("encontrado");
      return this.successRes(res, 200, "media found", media);
    } catch (error) {
      return this.errorRes(res, 500, "Error getting media", error);
    }
  };
}

export default new MediaController();
