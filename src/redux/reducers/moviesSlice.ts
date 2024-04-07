import { MovieDetails, client } from '../../api/tmdb';
import { createReducer } from '../utils';
import type { ActionWithPayload } from '../utils';
import { AppThunk } from '../store/store';

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
    image?: string;
}

interface MoviesState {
    top: Movie[];
    movie: Movie | Record<string, never>;
    loading: boolean;
    page: number;
    hasMorePages: boolean;
}

const initialState: MoviesState = {
    top: [],
    movie: {},
    loading: false,
    page: 0,
    hasMorePages: true,
};

const moviesLoaded = (
    movies: Movie[],
    page: number,
    hasMorePages: boolean,
) => ({
    type: 'movies/loaded',
    payload: { movies, page, hasMorePages },
});

const moviesLoading = () => ({
    type: 'movies/loading',
});

const fetchPage = (page: number): AppThunk<Promise<void>> => {
    return async (dispatch) => {
        dispatch(moviesLoading());
        const resMovies = await client.getNowPlaying(page);
        const resImages = await client.getConfiguration();
        const { results } = resMovies;
        const mappedResults: MovieDetails[] = results.map((movie) => {
            return {
                ...movie,
                image: resImages.images.base_url
                    ? `${resImages.images.base_url}w780${movie.backdrop_path}`
                    : undefined,
            };
        });
        const hasMorePages = resMovies.page < resMovies.totalPages;
        dispatch(moviesLoaded(mappedResults, page, hasMorePages));
    };
};

export const fetchNextPage = (): AppThunk<Promise<void>> => {
    return async (dispatch, getState) => {
        const nextPage = getState().movies.page + 1;
        dispatch(fetchPage(nextPage));
    };
};

const moviesReducer = createReducer<MoviesState>(initialState, {
    'movies/loaded': (
        state,
        action: ActionWithPayload<{
            movies: Movie[];
            page: number;
            hasMorePages: boolean;
        }>,
    ) => {
        return {
            ...state,
            top: [...state.top, ...action.payload.movies],
            page: action.payload.page,
            hasMorePages: action.payload.hasMorePages,
            loading: false,
        };
    },
    'movies/loading': (state) => {
        return {
            ...state,
            loading: true,
        };
    },
});

export default moviesReducer;
