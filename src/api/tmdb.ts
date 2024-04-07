import { configuration } from '../configuration';

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

export const client = {
    async getNowPlaying(
        page: number = 1,
    ): Promise<PageDetail<MovieDetails> | Record<string, never>> {
        const res = await get<GetResult<MovieDetails>>(
            `/movie/now_playing?language=en-US&page=${page}`,
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
};
