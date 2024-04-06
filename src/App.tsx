import { Link, Outlet } from 'react-router-dom';
import style from './App.module.scss';
const App = () => {
    return (
        <>
            <header className={style.header}>
                <nav className={style.nav}>
                    <ul className={style.list}>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/about">About</Link>
                        </li>
                        <li>
                            <Link to="/movies">Movies</Link>
                        </li>
                    </ul>
                </nav>
            </header>
            <main>
                <Outlet />
            </main>
        </>
    );
};
export default App;
