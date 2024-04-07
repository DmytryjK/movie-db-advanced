import App from './App.tsx';
import { About, Movies, Movie, Home } from './features/index.ts';
import { createBrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store/store.ts';

const AppEntryPoint = () => {
    return (
        <Provider store={store}>
            <App />
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
