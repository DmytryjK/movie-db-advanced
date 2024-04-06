import { MovieDetails, client } from '../api/tmdb';
import { createReducer } from '../redux/utils';
import type { ActionWithPayload } from '../redux/utils';
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
}

interface MoviesState {
    top: Movie[];
    movie: Movie | Record<string, never>;
    loading: boolean;
}

const initialState: MoviesState = {
    top: [],
    movie: {},
    loading: false,
};

const moviesLoaded = (movies: Movie[]) => ({
    type: 'movies/loaded',
    payload: movies,
});

const moviesLoading = () => ({
    type: 'movies/loading',
});

export const fetchMovies = (): AppThunk<Promise<void>> => {
    return async (dispatch) => {
        dispatch(moviesLoading());
        const resMovies = await client.getNowPlaying();
        const resImages = await client.getConfiguration();
        const mappedResults: MovieDetails[] = resMovies.map((movie) => {
            return {
                ...movie,
                image: resImages.images.base_url
                    ? `${resImages.images.base_url}w780${movie.backdrop_path}`
                    : undefined,
            };
        });
        dispatch(moviesLoaded(mappedResults));
    };
};

const moviesReducer = createReducer<MoviesState>(initialState, {
    'movies/loaded': (state, action: ActionWithPayload<Movie[]>) => {
        return {
            ...state,
            top: action.payload,
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
