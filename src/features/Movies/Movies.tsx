import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import MovieCard from './components/MovieCard/MovieCard';
import { client } from '../../api/tmdb';
import type { RootState } from '../../store/store';
import type { MovieDetails } from '../../api/tmdb';
import styles from './Movies.module.scss';

const Movies = () => {
    const [movies, setMovies] = useState<MovieDetails[]>([]);
    useEffect(() => {
        const loadMovies = async () => {
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
            setMovies(mappedResults);
        };
        loadMovies();
    }, []);

    return (
        <section className={styles.movies}>
            <ul className={styles.list}>
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
                        <li key={id}>
                            <MovieCard
                                id={id}
                                title={title}
                                overview={overview}
                                popularity={popularity}
                                language={original_language}
                                release_date={release_date}
                                image={image}
                            ></MovieCard>
                        </li>
                    );
                })}
            </ul>
        </section>
    );
};

const mapStateToProps = (state: RootState) => {
    return {
        movies: state.movies.top,
    };
};

const connector = connect(mapStateToProps);
export default connector(Movies);
