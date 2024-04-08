import {
    useCallback,
    useContext,
    useEffect,
    useState,
    lazy,
    Suspense,
} from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { fetchNextPage } from '../../redux/reducers/moviesSlice';
import { Container, LinearProgress, Grid } from '@mui/material';
import { AuthContext, anonymousUser } from '../../AuthContext';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import MovieCard from './components/MovieCard';
// import MoviesFilter from './components/MoviesFilter';
import { resetMovies } from '../../redux/reducers/moviesSlice';
import type { Filters } from './components/MoviesFilter';
const MoviesFilter = lazy(() => import('./components/MoviesFilter'));

export const Component = () => {
    const [filters, setFilters] = useState<Filters>();
    const movies = useAppSelector((state) => state.movies.top);
    const loading = useAppSelector((state) => state.movies.loading);
    const hasMorePages = useAppSelector((state) => state.movies.hasMorePages);
    const dispatch = useAppDispatch();

    const auth = useContext(AuthContext);
    const loggedIn = auth.user !== anonymousUser;

    const [targetRef, entry] = useIntersectionObserver();

    useEffect(() => {
        dispatch(resetMovies());
    }, [dispatch]);

    useEffect(() => {
        if (entry?.isIntersecting && hasMorePages) {
            const moviesFiltersId = filters
                ? {
                      keywords: filters.keywords.map((keyword) => keyword.id),
                      genres: filters?.genres,
                  }
                : undefined;
            dispatch(fetchNextPage(moviesFiltersId));
        }
    }, [dispatch, entry?.isIntersecting, hasMorePages, filters]);

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
                                dispatch(resetMovies());
                                setFilters(f);
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
                            const {
                                id,
                                title,
                                overview,
                                popularity,
                                original_language,
                                release_date,
                                image,
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
                                        image={image}
                                        enableUserActions={loggedIn}
                                        onAddFavorite={handleAddToFavorite}
                                    ></MovieCard>
                                </Grid>
                            );
                        })}
                    </Grid>
                    <div ref={targetRef}>
                        {loading && (
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
