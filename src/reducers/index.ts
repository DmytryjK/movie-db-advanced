import { combineReducers } from '@reduxjs/toolkit';
import { moviesReducer, movieReducer } from './moviesReducer';

const rootReducer = combineReducers({
    movies: moviesReducer,
    movie: movieReducer,
});

export default rootReducer;
