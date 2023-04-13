import { filterLoaded } from '../components/heroesFilters/filterSlice';

export const fetchingFilters = request => dispatch => {
    request('http:////localhost:3001/filters')
        .then(filters => dispatch(filterLoaded(filters)))
        .catch(err => console.log(err));
};

export const loadFilters = filters => {
    return {
        type: 'LOAD_FILTER',
        payload: filters,
    };
};

// export const activeFilter = activeFilter => {
//     return {
//         type: 'ACTIVE_FILTER',
//         payload: activeFilter,
//     };
// };

// export const heroesFetching = () => {
//     return {
//         type: 'HEROES_FETCHING',
//     };
// };

// export const heroesFetched = heroes => {
//     return {
//         type: 'HEROES_FETCHED',
//         payload: heroes,
//     };
// };

// export const heroesFetchingError = () => {
//     return {
//         type: 'HEROES_FETCHING_ERROR',
//     };
// };

// export const heroSubmit = newHero => {
//     return {
//         type: 'HERO_SUBMITING_DATA',
//         payload: newHero,
//     };
// };

// export const activeFilter = activeFilter => dispatch => {
//     setTimeout(() => {
//         dispatch({
//             type: 'ACTIVE_FILTER',
//             payload: activeFilter,
//         });
//     }, 1000);
// };

// export const deletedHero = id => {
//     return {
//         type: 'HEROES_DELETED',
//         payload: id,
//     };
// };
