import { Outlet } from 'react-router-dom';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { deepOrange } from '@mui/material/colors';
import Header from './Header';
import { AuthContext, AuthInfo, anonymousUser } from './AuthContext';
import { useState } from 'react';

const defaultTheme = createTheme({
    palette: {
        primary: deepOrange,
        secondary: {
            main: '#b23c17',
        },
    },
});

const App = () => {
    const [auth, setAuth] = useState<AuthInfo>({
        user: anonymousUser,
    });

    const fakeAuth: AuthInfo = {
        user: {
            name: 'Diana',
        },
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <CssBaseline />
            <AuthContext.Provider value={auth}>
                <Header
                    onLogin={() => setAuth(fakeAuth)}
                    onLogout={() => setAuth({ user: anonymousUser })}
                />
                <main>
                    <Outlet />
                </main>
            </AuthContext.Provider>
        </ThemeProvider>
    );
};
export default App;
