import { Link as RouterLink, Outlet } from 'react-router-dom';
import style from './App.module.scss';
import {
    AppBar,
    CssBaseline,
    Toolbar,
    Link,
    ThemeProvider,
    createTheme,
    Typography,
} from '@mui/material';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import type { ReactNode } from 'react';
import { deepOrange } from '@mui/material/colors';

const HeaderLink = ({ children, to }: { children: ReactNode; to: string }) => {
    return (
        <Link
            component={RouterLink}
            to={to}
            variant="button"
            color="inherit"
            sx={{ my: 1, mx: 1.5 }}
        >
            {children}
        </Link>
    );
};

const defaultTheme = createTheme({
    palette: {
        primary: deepOrange,
        secondary: {
            main: '#b23c17',
        },
    },
});

const App = () => {
    return (
        <ThemeProvider theme={defaultTheme}>
            <CssBaseline />
            <AppBar>
                <Toolbar>
                    <LiveTvIcon sx={{ mr: 2 }} />
                    <Typography variant="h6" color="inherit" noWrap>
                        The Movies DB
                    </Typography>
                    <nav className={style.nav}>
                        <ul className={style.list}>
                            <li>
                                <HeaderLink to="/">Home</HeaderLink>
                            </li>
                            <li>
                                <HeaderLink to="/about">About</HeaderLink>
                            </li>
                            <li>
                                <HeaderLink to="/movies">Movies</HeaderLink>
                            </li>
                        </ul>
                    </nav>
                </Toolbar>
            </AppBar>
            <main>
                <Outlet />
            </main>
        </ThemeProvider>
    );
};
export default App;
