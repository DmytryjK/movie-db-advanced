import { useEffect, useRef, useState } from 'react';
import { Box, Container, Typography } from '@mui/material';
import { addPopupToMapWidget, createMapWidget } from './MapWidget';
import { createPortal } from 'react-dom';
import { Favorite } from '@mui/icons-material';
import type { Map } from 'leaflet';

const Greeting = () => {
    return (
        <Box>
            <Typography>
                <Favorite sx={{ color: '#0056b9' }} />
                <Favorite sx={{ color: '#ffd800' }} />
            </Typography>
        </Box>
    );
};

const MapView = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const mapRef = useRef<Map | null>(null);
    const [popupContainer, setPopupContainer] = useState<HTMLElement | null>(
        null,
    );
    useEffect(() => {
        if (containerRef?.current && mapRef.current === null) {
            mapRef.current = createMapWidget(containerRef?.current);
            const popupDiv = addPopupToMapWidget(mapRef.current);
            setPopupContainer(popupDiv);
        }
    }, []);
    return (
        <Container
            ref={containerRef}
            sx={{ width: '100%', height: 500, my: 2 }}
        >
            {popupContainer !== null &&
                createPortal(<Greeting />, popupContainer)}
        </Container>
    );
};

export default MapView;
