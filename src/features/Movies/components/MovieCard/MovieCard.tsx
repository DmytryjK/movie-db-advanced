import { Link as RouterLink } from 'react-router-dom';
import {
    Card,
    CardMedia,
    CardContent,
    Typography,
    CardActions,
    Button,
} from '@mui/material';
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
    title,
    overview,
    popularity,
    release_date,
    image,
    id,
}: MovieCardProps) => {
    return (
        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardMedia
                component="div"
                image={image || thumbnail}
                sx={{ pt: '56.25%' }}
            ></CardMedia>
            <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h5" gutterBottom>
                    {title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {overview}
                </Typography>
                <Typography variant="button" display="block" mt={2}>
                    {popularity}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    published at: {release_date}
                </Typography>
            </CardContent>
            <CardActions>
                <Button component={RouterLink} to={`/movies/${id}`}>
                    Details
                </Button>
            </CardActions>
        </Card>
    );
};

export default MovieCard;
