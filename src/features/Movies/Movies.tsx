import { useContext, useEffect } from 'react';
import MovieCard from './components/MovieCard/MovieCard';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { fetchMovies } from '../../redux/reducers/moviesReducer';
import { Container, Typography, LinearProgress, Grid } from '@mui/material';
import { AuthContext, anonymousUser } from '../../AuthContext';

const Movies = () => {
    const movies = useAppSelector((state) => state.movies.top);
    const loading = useAppSelector((state) => state.movies.loading);
    const dispatch = useAppDispatch();

    const auth = useContext(AuthContext);
    const loggedIn = auth.user !== anonymousUser;

    useEffect(() => {
        dispatch(fetchMovies());
    }, [dispatch]);

    return (
        <section>
            <Container sx={{ py: 12 }} maxWidth="lg">
                <Typography variant="h4" align="center" gutterBottom>
                    Now playing
                </Typography>
                {loading ? (
                    <LinearProgress color="secondary" />
                ) : (
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
                )}
            </Container>
        </section>
    );
};

export default Movies;
