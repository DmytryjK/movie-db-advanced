import { useEffect } from 'react';
import { connect } from 'react-redux';
import MovieCard from './components/MovieCard/MovieCard';
import { useAppDispatch } from '../../hooks';
import { fetchMovies } from '../../reducers/moviesReducer';
import type { RootState } from '../../store/store';
import type { MovieDetails } from '../../api/tmdb';
import { Container, Typography, LinearProgress, Grid } from '@mui/material';

interface MoviesProps {
    movies: MovieDetails[];
    loading: boolean;
}

const Movies = ({ movies, loading }: MoviesProps) => {
    const dispatch = useAppDispatch();
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

const mapStateToProps = (state: RootState) => {
    return {
        movies: state.movies.top,
        loading: state.movies.loading,
    };
};

const connector = connect(mapStateToProps);
export default connector(Movies);
