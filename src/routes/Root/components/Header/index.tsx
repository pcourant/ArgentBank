import { Outlet, Link } from 'react-router-dom';
import styles from './Header.module.css';

import Logo from '../../../../assets/argentBankLogo.png';

const Header = () => {
    return (
        <nav className={styles.mainNav}>
            <Link className={styles.mainNavLogo} to={`home`}>
                <img
                    className={styles.mainNavLogoImage}
                    src={Logo}
                    alt="Argent Bank Logo"
                />
                <h1 className="sr-only">Argent Bank</h1>
            </Link>
            <div>
                <Link className={styles.mainNavItem} to={`sign-in`}>
                    <i className="fa fa-user-circle"></i>
                    Sign In
                </Link>
            </div>
        </nav>
    );
};

export default Header;
