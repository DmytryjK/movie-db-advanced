import App from './App.tsx';
import { About, Movies, Movie } from './features/index.ts';
import { createBrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store.ts';

const router = createBrowserRouter([
    {
        path: '/',
        element: (
            <Provider store={store}>
                <App />
            </Provider>
        ),
        children: [
            {
                path: '/about',
                element: <About />,
            },
            {
                path: '/movies',
                element: <Movies />,
            },
            {
                path: '/movies/:id',
                element: <Movie movie={{}} />,
            },
        ],
    },
]);

export default router;
