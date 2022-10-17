import { Outlet, Link } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';

const Root = () => {
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    );
};

export default Root;
