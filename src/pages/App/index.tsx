import { Outlet } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';

import { UserContextProvider } from '../../context';

const App = () => {
    return (
        <>
            <UserContextProvider>
                <Header />
                <Outlet />
                <Footer />
            </UserContextProvider>
        </>
    );
};

export default App;
