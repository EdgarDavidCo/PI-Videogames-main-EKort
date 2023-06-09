import axios from "axios";
import {
    GET_VIDEOGAMES,
    GET_NAME_VIDEOGAME,
    GET_VIDEOGAME_DETAIL,
    GET_GENRES,
    FILTER_BY_CREATION,
    FILTER_BY_GENRE,
    ORDER_BY_NAME,
    ORDER_BY_RATING,
} from './constantes';

export const createVideogame = (payload) => {
    return async () => {
        try {
            let postVideogame = await axios.post("/videogames", payload);
            return postVideogame;
        } catch (error) {
            console.log(error)
        }
    }
};


export const getVideogames = () => {
    return async (dispatch)  => {
        try {
            let getApi = await axios.get("/videogames");
            dispatch({
                type:GET_VIDEOGAMES,
                payload: getApi.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}
export const getNameVideogame = (payload) => {
    return async (dispatch) => {
        try {
            let info = await axios.get(`/videogames?name=${payload}`)
            dispatch({
                type: GET_NAME_VIDEOGAME,
                payload: info.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}
export const getVideogameDetail = (id) => {
    return async (dispatch) => {
        try {
            let getApi = await axios.get(`/videogame/${id}`);
            dispatch({
                type: GET_VIDEOGAME_DETAIL,
                payload: getApi.data
            })
        } catch (error) {
            console.log(error)
        }
    }
};
export const getGenres = () => {
    return async (dispatch) => {
        try {
            let genresApi = await axios.get(`/genres`);
            dispatch({
                type: GET_GENRES,
                payload: genresApi.data
            })
        } catch (error) {
            console.log(error)
        }
    }
};
export function filterByCreation(payload) {
    return {
        type: FILTER_BY_CREATION,
        payload
    }
};
export function filterByGenre(payload) {
    return {
        type: FILTER_BY_GENRE,
        payload
    }
};
export function orderByName(payload) {
    return {
        type: ORDER_BY_NAME,
        payload
    }
};
export function orderByRating(payload) {
    return {
        type: ORDER_BY_RATING,
        payload
    }
} 






