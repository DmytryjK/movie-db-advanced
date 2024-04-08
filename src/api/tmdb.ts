import { configuration } from '../configuration';
import type { KeywordItem } from '../features/Movies/components/MoviesFilter';

const get = async <TBody>(relativeUrl: string): Promise<TBody | undefined> => {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${configuration.apiToken}`,
        },
    };
    try {
        const response = await fetch(
            `${configuration.apiUrl}/3${relativeUrl}`,
            options,
        );
        if (!response.ok) {
            throw new Error('something went wrong');
        }
        const data = await response.json();
        return data;
    } catch (e: unknown) {
        if (e instanceof Error) {
            console.log('::', e.message);
        }
    }
};

type GetResult<T> = PageResponse<T> | undefined;

interface PageDetail<TResult> {
    results: TResult[];
    page: number;
    totalPages: number;
}
interface PageResponse<TResult> {
    results: TResult[];
    page: number;
    total_pages: number;
}

export interface MovieDetails {
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

interface Configuration {
    images: {
        base_url: string;
    };
}

export interface MoviesFiltersId {
    keywords?: number[];
    genres?: number[];
}

export const client = {
    async getMovies(
        page: number = 1,
        filters: MoviesFiltersId,
    ): Promise<PageDetail<MovieDetails> | Record<string, never>> {
        const params = new URLSearchParams({
            page: page.toString(),
        });

        if (filters.keywords?.length) {
            params.append('with_keywords', filters.keywords.join('|'));
        }
        if (filters.genres?.length) {
            params.append('with_genres', filters.genres.join(','));
        }
        console.log(filters);
        const res = await get<GetResult<MovieDetails>>(
            `/discover/movie?${params}`,
        );
        if (res) {
            return {
                results: res.results,
                page: res.page,
                totalPages: res.total_pages,
            };
        } else {
            return {};
        }
    },
    async getConfiguration(): Promise<Configuration | Record<string, never>> {
        const res = await get<Configuration>('/configuration');
        return res || {};
    },
    async getKeywords(query: string): Promise<KeywordItem[]> {
        const res = await get<PageResponse<KeywordItem>>(
            `/search/keyword?query=${query}`,
        );
        return res?.results || [];
    },
};
