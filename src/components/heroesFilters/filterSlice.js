import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { useHttp } from '../../hooks/http.hook';

const filterAdapter = createEntityAdapter();

const initialState = filterAdapter.getInitialState({
    filterLoadingStatus: 'idle',
    activeFilter: 'all',
});

export const fetchFilter = createAsyncThunk('filter/fetchFilter', () => {
    const { request } = useHttp();
    return request('http:////localhost:3001/filters');
});
const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        filterSetActive: (state, action) => {
            state.activeFilter = action.payload;
        },
    },
    extraReducers: builder => {
        builder
            .addCase(fetchFilter.pending, state => {
                state.filterLoadingStatus = 'loading';
            })
            .addCase(fetchFilter.fulfilled, (state, action) => {
                filterAdapter.setAll(state, action.payload);
                state.filterLoadingStatus = 'idle';
            })
            .addCase(fetchFilter.rejected, state => {
                state.filterLoadingStatus = 'error';
            });
    },
});

const { actions, reducer } = filterSlice;

export const { selectAll } = filterAdapter.getSelectors(state => state.filter);

export const { filterSetActive, filterLoaded } = actions;

export default reducer;
