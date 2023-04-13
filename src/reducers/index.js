import { activeFilter } from '../actions';

const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle',
    filters: [],
    activeFilter: 'all',
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'HEROES_FETCHING':
            return {
                ...state,
                heroesLoadingStatus: 'loading',
            };
        case 'HEROES_FETCHED':
            return {
                ...state,
                heroes: action.payload,
                heroesLoadingStatus: 'idle',
            };
        case 'HEROES_FETCHING_ERROR':
            return {
                ...state,
                heroesLoadingStatus: 'error',
            };
        case 'HERO_SUBMITING_DATA':
            return {
                ...state,
                heroes: [...state.heroes, action.payload],
            };

        case 'HERO_FILTERED_DATA':
            return {
                ...state,
                heroes: action.payload,
            };

        case 'LOAD_FILTER':
            return {
                ...state,
                filters: action.payload,
            };

        case 'HEROES_DELETED':
            return {
                ...state,
                heroes: state.heroes.filter(hero => hero.id !== action.payload),
            };
        case 'ACTIVE_FILTER':
            return {
                ...state,
                activeFilter: action.payload,
            };

        default:
            return state;
    }
};

export default reducer;
