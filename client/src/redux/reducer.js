import {
    GET_VIDEOGAMES,
    GET_NAME_VIDEOGAME,
    GET_VIDEOGAME_DETAIL,
    GET_GENRES,
    FILTER_BY_CREATION,
    FILTER_BY_GENRE,
    ORDER_BY_NAME,
    ORDER_BY_RATING,
} from "./constantes";
const initialState = {
    videogames: [],
    videogamesCopy: [],
    genres: [],
    videogameDetail: {}
}

export default function rootReducer(state = initialState, action) {
    switch (action.type) {
        case GET_VIDEOGAMES:
            return {
                ...state,
                videogames: action.payload,
                videogamesCopy: action.payload
            }
        case GET_NAME_VIDEOGAME:
            return {
                ...state,
                videogames: action.payload
            }
        case GET_VIDEOGAME_DETAIL:
            return {
                ...state,
                videogameDetail: action.payload
            }
        case GET_GENRES:
            return {
                ...state,
                genres: action.payload
            }
        case FILTER_BY_CREATION:
            let videogamesToFilterByCreation;
            if (action.payload === 'original') {
                let filterByOriginal = state.videogamesCopy.filter(copy => copy.id.toString().length < 7)
                videogamesToFilterByCreation = filterByOriginal;
            }
            if (action.payload === 'created') {
                let filterByCreated = state.videogamesCopy.filter(copy => copy.id.toString().length > 7)
                videogamesToFilterByCreation = filterByCreated;
            }
            if (action.payload === 'all') {
                let noFilter = state.videogamesCopy;
                videogamesToFilterByCreation = noFilter
            }
            if (videogamesToFilterByCreation.length === 0) {
                videogamesToFilterByCreation = ['No games created']
            }
            return {
                ...state,
                videogames: videogamesToFilterByCreation
            };
        case FILTER_BY_GENRE:
            const videogamesToFilterByGenre = state.videogamesCopy;
            const genreFilter = action.payload === 'All' ?
                videogamesToFilterByGenre :
                videogamesToFilterByGenre.filter(vd => vd.genres.includes(action.payload))
            return {
                ...state,
                videogames: genreFilter
            }
        case ORDER_BY_NAME:
            const orderedName = action.payload === "AZ" ? state.videogames.sort(function (a, b) {
                if (a.name > b.name) {
                    return 1;
                }
                if (b.name > a.name) {
                    return -1;
                }
                return 0;
            }) :
                state.videogames.sort(function (a, b) {
                    if (a.name > b.name) {
                        return -1;
                    }
                    if (b.name > a.name) {
                        return 1
                    }
                    return 0;
                })
            return {
                ...state,
                payload: orderedName
            }
        case ORDER_BY_RATING:
            const orderRating = action.payload === "HTL" ?
                state.videogames.sort(function (a, b) {
                    if (a.rating > b.rating) {
                        return -1;
                    }
                    if (b.rating > a.rating) {
                        return 1;
                    }
                    return 0;
                }) :
                state.videogames.sort(function (a, b) {
                    if (a.rating > b.rating) {
                        return 1;
                    }
                    if (b.rating > a.rating) {
                        return -1;
                    }
                    return 0
                })
            return {
                ...state,
                payload: orderRating
            }
        default:
            return state;
    }
}
