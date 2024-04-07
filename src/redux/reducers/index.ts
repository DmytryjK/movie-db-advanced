import { combineReducers } from '@reduxjs/toolkit';
import moviesReducer from './moviesSlice';

const rootReducer = combineReducers({
    movies: moviesReducer,
});

export default rootReducer;
