import { configureStore } from '@reduxjs/toolkit';
import heroes from '../components/heroesList/heroesSlice';
import filter from '../components/heroesFilters/filterSlice';
import { apiSlice } from '../api/apiSlice';

const stringMiddleware = () => next => action => {
    typeof action === 'string'
        ? next({
              type: action,
          })
        : next(action);
};

// const enchancer =
//     createStore =>
//     (...arg) => {
//         const store = createStore(...arg);

//         const oldDispatch = store.dispatch;
//         store.dispatch = action => {
//             typeof action === 'string'
//                 ? oldDispatch({
//                       type: action,
//                   })
//                 : oldDispatch(action);
//         };
//         return store;
//     };

const store = configureStore({
    reducer: { heroes, filter, [apiSlice.reducerPath]: apiSlice.reducer },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(stringMiddleware, apiSlice.middleware),
    devTools: process.env.NODE_ENV !== 'production',
});

// const store = createStore(
//     combineReducers({ heroes, filter }),
//     compose(
//         applyMiddleware(ReduxThunk, stringMiddleware),
//         // compose(
//         //     enchancer,
//         window.__REDUX_DEVTOOLS_EXTENSION__ &&
//             window.__REDUX_DEVTOOLS_EXTENSION__(),
//     ),
// );

export default store;
