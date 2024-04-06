import { Link } from 'react-router-dom';
import styles from './MovieCard.module.scss';
import thumbnail from '../../../../assets/movie-thumb.png';

interface MovieCardProps {
    id: number;
    title: string;
    overview: string;
    popularity: number;
    language: string;
    release_date: string;
    image?: string;
}

const MovieCard = ({
    id,
    title,
    overview,
    popularity,
    language,
    release_date,
    image,
}: MovieCardProps) => {
    return (
        <div className={styles.movieCard}>
            <img src={image || thumbnail} alt="Movie thumbnail" />
            <div className={styles.content}>
                <Link to={`/movies/${id}`} className={styles.link}>
                    {title}
                </Link>
                <div className={styles.overview}>{overview}</div>
                <div className={styles.popularity}>{popularity}</div>
                <div className={styles.additional}>
                    <p>language: {language}</p>
                    <p>published: {release_date}</p>
                </div>
            </div>
        </div>
    );
};

export default MovieCard;
