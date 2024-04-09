import { useCallback, useContext, useState, lazy, Suspense } from 'react';
import { Container, LinearProgress, Grid } from '@mui/material';
import { AuthContext, anonymousUser } from '../../AuthContext';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import MovieCard from './components/MovieCard';
import type { MoviesQuery } from '../../services/tmdb';
import {
    MoviesFilters,
    useGetConfigurationQuery,
    useGetMoviesQuery,
} from '../../services/tmdb';
const MoviesFilter = lazy(() => import('./components/MoviesFilter'));

export const Component = () => {
    const { data: configuration } = useGetConfigurationQuery();
    const [query, setQuery] = useState<MoviesQuery>({
        filters: {},
        page: 1,
    });
    const { data, isFetching } = useGetMoviesQuery(query);
    const movies = data?.results ?? [];
    const hasMorePages = data?.hasMorePages;

    const auth = useContext(AuthContext);
    const loggedIn = auth.user !== anonymousUser;

    const formatImageUrl = (imagePath?: string | null) => {
        return imagePath && configuration
            ? `${configuration.images.base_url}w780${imagePath}`
            : undefined;
    };

    const onIntersect = useCallback(() => {
        if (hasMorePages) {
            setQuery((prev) => {
                return {
                    ...prev,
                    page: prev.page + 1,
                };
            });
        }
    }, [hasMorePages]);

    const [targetRef] = useIntersectionObserver({ onIntersect });

    const handleAddToFavorite = useCallback((id: number) => {
        console.log(id);
    }, []);

    return (
        <Grid container spacing={12} sx={{ flexWrap: 'nowrap' }}>
            <Grid item xs="auto">
                <Container sx={{ py: 12 }}>
                    <Suspense fallback="loading...">
                        <MoviesFilter
                            onApply={(f) => {
                                // dispatch(resetMovies());
                                const filters: MoviesFilters = {
                                    keywords: f.keywords?.map((k) => k.id),
                                    genres: f.genres,
                                };
                                setQuery({
                                    page: 1,
                                    filters,
                                });
                            }}
                        />
                    </Suspense>
                </Container>
            </Grid>
            <Grid item xs={12}>
                <Container sx={{ py: 12 }} maxWidth="lg">
                    {/* <Typography variant="h4" align="center" gutterBottom>
                        Now playing
                    </Typography> */}
                    <Grid container spacing={4}>
                        {movies.map((movie, index) => {
                            console.log(movie);
                            const {
                                id,
                                title,
                                overview,
                                popularity,
                                original_language,
                                release_date,
                                backdrop_path,
                            } = movie;
                            return (
                                <Grid
                                    key={`${id}${index}`}
                                    item
                                    xs={12}
                                    sm={6}
                                    md={4}
                                >
                                    <MovieCard
                                        id={id}
                                        title={title}
                                        overview={overview}
                                        popularity={popularity}
                                        language={original_language}
                                        release_date={release_date}
                                        image={formatImageUrl(backdrop_path)}
                                        enableUserActions={loggedIn}
                                        onAddFavorite={handleAddToFavorite}
                                    ></MovieCard>
                                </Grid>
                            );
                        })}
                    </Grid>
                    <div ref={targetRef}>
                        {isFetching && movies.length && (
                            <LinearProgress color="secondary" sx={{ mt: 3 }} />
                        )}
                    </div>
                </Container>
            </Grid>
        </Grid>
    );
};

// export default Movies;
Component.displayName = 'Movies';
