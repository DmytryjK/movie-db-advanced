import App from './App.tsx';
import { Movie, Home } from './features/index.ts';
import { createBrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ErrorBoundary } from './ErrorBoundary.tsx';
import store from './redux/store/store.ts';
import { lazy, Suspense } from 'react';
import { LinearProgress } from '@mui/material';

const About = lazy(() => import('./features/About/About.tsx'));
const Extra = lazy(() => import('./features/Extra/Extra.tsx'));

const AppEntryPoint = () => {
    return (
        <Provider store={store}>
            <ErrorBoundary>
                <App />
            </ErrorBoundary>
        </Provider>
    );
};

const router = createBrowserRouter([
    {
        path: '/',
        element: <AppEntryPoint />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: '/about',
                element: (
                    <Suspense fallback={<LinearProgress sx={{ mt: 10 }} />}>
                        <About />
                    </Suspense>
                ),
            },
            {
                path: '/movies',
                lazy: () => import('./features/Movies/Movies.tsx'),
            },
            {
                path: '/movies/:id',
                element: <Movie movie={{}} />,
            },
            {
                path: '/extra',
                element: (
                    <Suspense fallback={<LinearProgress sx={{ mt: 10 }} />}>
                        <Extra />
                    </Suspense>
                ),
            },
        ],
    },
]);

export default router;
