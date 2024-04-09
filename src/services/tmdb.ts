import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { configuration } from '../configuration';

interface Configuration {
    images: {
        base_url: string;
    };
}

type GetResult<T> = PageResponse<T> | undefined;
type PageResult<T> = PageDetail<T> | Record<string, never>;

interface PageDetail<TResult> {
    results: TResult[];
    lastPage: number;
    hasMorePages: boolean;
}
interface PageResponse<TResult> {
    results: TResult[];
    page: number;
    total_pages: number;
}

interface MovieDetails {
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    release_date: string;
    title: string;
    vote_average: number;
    vote_count: number;
    backdrop_path?: string;
    image?: string;
}

export interface MoviesFilters {
    keywords?: number[];
    genres?: number[];
}

export interface MoviesQuery {
    page: number;
    filters: MoviesFilters;
}

interface KeywordItem {
    id: number;
    name: string;
}

interface Genre {
    id: number;
    name: string;
}

export const tmdbApi = createApi({
    reducerPath: 'tmdbApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${configuration.apiUrl}/3`,
        prepareHeaders(headers) {
            headers.set('Accept', 'application/json');
            headers.set('Authorization', `Bearer ${configuration.apiToken}`);
        },
    }),
    endpoints: (builder) => ({
        getConfiguration: builder.query<
            Configuration | Record<string, never>,
            void
        >({
            query: () => '/configuration',
            transformResponse: (res: Configuration) => res || {},
        }),
        getMovies: builder.query<PageResult<MovieDetails>, MoviesQuery>({
            query(moviesQuery) {
                const { page, filters } = moviesQuery;
                const params = new URLSearchParams({
                    page: page.toString(),
                });

                if (filters.keywords?.length) {
                    params.append('with_keywords', filters.keywords.join('|'));
                }
                if (filters.genres?.length) {
                    params.append('with_genres', filters.genres.join(','));
                }
                const path = `/discover/movie?${params}`;
                return path;
            },
            transformResponse(res: GetResult<MovieDetails>, _, arg) {
                let result = {};
                if (res) {
                    result = {
                        results: res.results,
                        lastPage: res.page,
                        hasMorePages: res.total_pages > arg.page,
                    };
                }
                return result;
            },
            merge(currentCachData, responseData) {
                if (responseData.lastPage === 1) {
                    currentCachData.results = responseData.results;
                } else {
                    currentCachData.results.push(...responseData.results);
                }

                currentCachData.lastPage = responseData.lastPage;
                currentCachData.hasMorePages = responseData.hasMorePages;
            },
            serializeQueryArgs({ endpointName }) {
                return endpointName;
            },
            forceRefetch({ currentArg, previousArg }) {
                return currentArg !== previousArg;
            },
        }),
        getKeywords: builder.query<KeywordItem[], string>({
            query: (queryText: string) => `/search/keyword?query=${queryText}`,
            transformResponse: (response: PageResponse<KeywordItem>) =>
                response?.results || [],
        }),
        getGenres: builder.query<Genre[], void>({
            query: () => '/genre/movie/list',
            transformResponse: (response: { genres: Genre[] }) =>
                response.genres,
        }),
    }),
});

export const {
    useGetConfigurationQuery,
    useGetGenresQuery,
    useGetKeywordsQuery,
    useGetMoviesQuery,
} = tmdbApi;
