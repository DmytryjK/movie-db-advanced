import { Container } from '@mui/material';
import CountDownText from './components/CountDownText';
import CountDownVideo from './components/CountDownVideo';
import MapView from './components/MapView';

const About = () => {
    return (
        <Container sx={{ py: 8 }} maxWidth="md">
            <CountDownText />
            <CountDownVideo />
            <MapView />
        </Container>
    );
};

export default About;
