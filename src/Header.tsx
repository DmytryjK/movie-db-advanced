import { useContext } from 'react';
import { AppBar, Toolbar, Typography, Link, Button, Box } from '@mui/material';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import { Link as RouterLink } from 'react-router-dom';
import { AuthContext, anonymousUser } from './AuthContext';
import type { ReactNode } from 'react';
import style from './Header.module.scss';

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

interface AuthSectionProps {
    onLogin: () => void;
    onLogout: () => void;
}

const AuthSection = ({ onLogin, onLogout }: AuthSectionProps) => {
    const auth = useContext(AuthContext);
    const loggedIn = auth.user !== anonymousUser;
    return (
        <Box
            sx={{
                marginLeft: 'auto',
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
            }}
        >
            {loggedIn && <Typography>Hello {auth.user.name}</Typography>}
            {loggedIn ? (
                <Button color="inherit" variant="outlined" onClick={onLogout}>
                    Log out
                </Button>
            ) : (
                <Button color="inherit" variant="outlined" onClick={onLogin}>
                    Login
                </Button>
            )}
        </Box>
    );
};

interface HeaderProps {
    onLogin: () => void;
    onLogout: () => void;
}

const Header = ({ onLogin, onLogout }: HeaderProps) => {
    return (
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
                <AuthSection onLogin={onLogin} onLogout={onLogout} />
            </Toolbar>
        </AppBar>
    );
};

export default Header;
