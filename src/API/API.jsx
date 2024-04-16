import axios from "axios";
import APIError from "./Error";

export default class TMDBService {
    static async getMovies(year=0, genre=0, page=1) {
        let params = {
            page,
        }
        if (year !== 0) {
            params.year = year
        }
        if (genre !== 0) {
            params.genre = genre
        }
        const response = await axios.get(`http://188.225.74.17:8080/api/v1/movies`, {
            params: params
        })
        if (response.status !== 200) {
            throw new APIError(response.message)
        }
        console.log(response.data)
        return response.data
    }
    static async getMovieByID(movieID) {
        const response = await axios.get(`http://188.225.74.17:8080/api/v1/movies/`+movieID)
        if (response.status !== 200) {
            throw new APIError(response.message)
        }
        console.log(response.data)
        return response.data
    }
}