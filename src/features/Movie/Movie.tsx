import { connect } from 'react-redux';
import type { RootState } from '../../redux/store/store';
import type { Movie } from '../../redux/reducers/moviesSlice';
import style from './Movie.module.scss';

interface MovieProps {
    movie: Movie | Record<string, never>;
}
const Movie = ({ movie }: MovieProps) => {
    return Object.assign(movie).length > 0 ? (
        <div className={style.movie}>{movie.title}</div>
    ) : (
        ''
    );
};

const mapStateToProps = (state: RootState) => {
    return {
        movies: state.movies.movie,
    };
};

const connector = connect(mapStateToProps);
export default connector(Movie);
