import { useContext, useEffect } from 'react';
import MovieCard from './components/MovieCard/MovieCard';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { fetchNextPage } from '../../redux/reducers/moviesSlice';
import { Container, Typography, LinearProgress, Grid } from '@mui/material';
import { AuthContext, anonymousUser } from '../../AuthContext';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

const Movies = () => {
    const movies = useAppSelector((state) => state.movies.top);
    const loading = useAppSelector((state) => state.movies.loading);
    const hasMorePages = useAppSelector((state) => state.movies.hasMorePages);
    const dispatch = useAppDispatch();

    const auth = useContext(AuthContext);
    const loggedIn = auth.user !== anonymousUser;

    const [targetRef, entry] = useIntersectionObserver();

    useEffect(() => {
        if (entry?.isIntersecting && hasMorePages) {
            dispatch(fetchNextPage());
        }
    }, [dispatch, entry?.isIntersecting, hasMorePages]);

    return (
        <section>
            <Container sx={{ py: 12 }} maxWidth="lg">
                <Typography variant="h4" align="center" gutterBottom>
                    Now playing
                </Typography>
                <Grid container spacing={4}>
                    {movies.map((movie) => {
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
                            <Grid key={id} item xs={12} sm={6} md={4}>
                                <MovieCard
                                    id={id}
                                    title={title}
                                    overview={overview}
                                    popularity={popularity}
                                    language={original_language}
                                    release_date={release_date}
                                    image={image}
                                    enableUserActions={loggedIn}
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
        </section>
    );
};

export default Movies;
