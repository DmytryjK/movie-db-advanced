import { useEffect } from 'react';
import { connect } from 'react-redux';
import MovieCard from './components/MovieCard/MovieCard';
import { useAppDispatch } from '../../hooks';
import { fetchMovies } from '../../reducers/moviesReducer';
import type { RootState } from '../../store/store';
import type { MovieDetails } from '../../api/tmdb';
import styles from './Movies.module.scss';

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
        <section className={styles.movies}>
            <ul className={styles.list}>
                {loading
                    ? 'loading data...'
                    : movies.map((movie) => {
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
        loading: state.movies.loading,
    };
};

const connector = connect(mapStateToProps);
export default connector(Movies);
