import { PayloadAction } from '@reduxjs/toolkit';
import type { Reducer } from 'react';

export interface Movie {
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    release_date: string;
    title: string;
    vote_average: number;
    vote_count: number;
}

interface MoviesState {
    top: Movie[];
    movie: Movie | Record<string, never>;
}

const initialState: MoviesState = {
    top: [
        {
            id: 278,
            adult: false,
            original_language: 'en',
            original_title: 'The Shawshank Redemption',
            overview:
                'Framed in the 1940s for the double murder of his wife and her lover, upstanding banker Andy Dufresne begins a new life at the Shawshank prison, where he puts his accounting skills to work for an amoral warden. During his long stretch in prison, Dufresne comes to be admired by the other inmates -- including an older prisoner named Red -- for his integrity and unquenchable sense of hope.',
            popularity: 171.726,
            release_date: '1994-09-23',
            title: 'The Shawshank Redemption',
            vote_average: 8.7,
            vote_count: 25927,
        },
        {
            adult: false,
            id: 238,
            original_language: 'en',
            original_title: 'The Godfather',
            overview:
                'Spanning the years 1945 to 1955, a chronicle of the fictional Italian-American Corleone crime family. When organized crime family patriarch, Vito Corleone barely survives an attempt on his life, his youngest son, Michael steps in to take care of the would-be killers, launching a campaign of bloody revenge.',
            popularity: 115.533,
            release_date: '1972-03-14',
            title: 'The Godfather',
            vote_average: 8.7,
            vote_count: 19660,
        },
        {
            adult: false,
            id: 240,
            original_language: 'en',
            original_title: 'The Godfather Part II',
            overview:
                'In the continuing saga of the Corleone crime family, a young Vito Corleone grows up in Sicily and in 1910s New York. In the 1950s, Michael Corleone attempts to expand the family business into Las Vegas, Hollywood and Cuba.',
            popularity: 92.947,
            release_date: '1974-12-20',
            title: 'The Godfather Part II',
            vote_average: 8.575,
            vote_count: 11877,
        },
        // {
        //     id: 1,
        //     title: 'Inception',
        //     popularity: 98,
        //     overview: 'Dreams...',
        // },
        // {
        //     id: 2,
        //     title: 'Inception2',
        //     popularity: 98,
        //     overview: 'Dreams...2',
        // },
        // {
        //     id: 3,
        //     title: 'Inception3',
        //     popularity: 98,
        //     overview: 'Dreams...3',
        // },
        // {
        //     id: 4,
        //     title: 'Inception4',
        //     popularity: 98,
        //     overview: 'Dreams...4',
        // },
    ],
    movie: {},
};
const moviesReducer: Reducer<MoviesState, PayloadAction> = () => {
    return initialState;
};
const movieReducer: Reducer<MoviesState, PayloadAction<number>> = (
    state,
    action,
) => {
    initialState.movie = initialState.top.find((item) => item.id === 278) || {};
    return initialState;
};

export { moviesReducer, movieReducer };
