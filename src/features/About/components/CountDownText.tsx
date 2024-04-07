import { Typography } from '@mui/material';
import { useEffect, useState, useRef } from 'react';

const CountDownText = () => {
    const [countDown, setCountDown] = useState(9);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const intervalRef = useRef<any>(null);
    useEffect(() => {
        intervalRef.current = setInterval(() => {
            setCountDown((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(intervalRef.current);
    }, []);

    useEffect(() => {
        if (countDown === 0) {
            clearInterval(intervalRef.current);
        }
    }, [countDown]);

    return (
        <Typography variant="h4" align="center">
            Coming soon: {countDown}
        </Typography>
    );
};

export default CountDownText;
