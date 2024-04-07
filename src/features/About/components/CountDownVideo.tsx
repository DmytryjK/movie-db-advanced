import { useState, useRef } from 'react';
import { Card, CardActions, CardMedia, IconButton } from '@mui/material';
import { PlayArrow, PauseCircle } from '@mui/icons-material';

const CountDownVideo = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    const togglePlaying = () => {
        const nextPlaying = !isPlaying;
        if (nextPlaying) {
            videoRef.current?.play();
        } else {
            videoRef.current?.pause();
        }
    };

    return (
        <Card sx={{ position: 'relative' }}>
            <CardMedia>
                <video
                    ref={videoRef}
                    src="https://www.pexels.com/download/video/3843433"
                    height="100%"
                    width="100%"
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                />
                <CardActions>
                    {!isPlaying && (
                        <IconButton
                            sx={{
                                height: 48,
                                width: 48,
                                padding: 0,
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%);',
                                bgcolor: 'white',
                                ':hover': {
                                    bgcolor: 'primary.main',
                                    transition:
                                        '0.2s ease-out background-color',
                                },
                            }}
                            onClick={togglePlaying}
                        >
                            <PlayArrow
                                sx={{
                                    height: '100%',
                                    width: '100%',
                                    padding: 0.5,
                                    borderRadius: '50%',
                                    ':hover': {
                                        color: 'white',
                                        transition: '0.2s ease-out color',
                                    },
                                }}
                                color="primary"
                            />
                        </IconButton>
                    )}
                    {isPlaying && (
                        <IconButton
                            sx={{
                                height: 48,
                                width: 48,
                                padding: 0,
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%);',
                                bgcolor: 'white',
                                ':hover': {
                                    bgcolor: 'primary.main',
                                    transition:
                                        '0.2s ease-out background-color',
                                },
                            }}
                            onClick={togglePlaying}
                        >
                            <PauseCircle
                                sx={{
                                    height: '100%',
                                    width: '100%',
                                    padding: 0.5,
                                    borderRadius: '50%',
                                    ':hover': {
                                        color: 'white',
                                        transition: '0.2s ease-out color',
                                    },
                                }}
                                color="primary"
                            />
                        </IconButton>
                    )}
                </CardActions>
            </CardMedia>
        </Card>
    );
};

export default CountDownVideo;
