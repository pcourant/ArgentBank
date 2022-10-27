import { Link } from 'react-router-dom';
import client from '@utils/config/axios';
import { useUserContext } from '@utils/context';

import styles from './Header.module.css';
import Logo from '@assets/images/argentBankLogo.png';

const Header = () => {
  const { user, setUser } = useUserContext();

  const handleSignOut = () => {
    setUser({ ...user, firstName: '', lastName: '' });
    client.defaults.headers.common['Authorization'] = '';
  };

  return (
    <nav className={styles.mainNav}>
      <Link className={styles.mainNavLogo} to={'home'}>
        <img
          className={styles.mainNavLogoImage}
          src={Logo}
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>
      <div className={styles.mainNavItemContainer}>
        <Link
          className={styles.mainNavItem}
          to={user.firstName ? 'user' : 'sign-in'}
        >
          <i className="fa fa-user-circle"></i>
          {user.firstName ? user.firstName : 'Sign In'}
        </Link>
        {user.firstName ? (
          <Link
            className={styles.mainNavItem}
            to="home"
            onClick={handleSignOut}
          >
            <i className="fa fa-sign-out"></i>
            Sign Out
          </Link>
        ) : null}
      </div>
    </nav>
  );
};

export default Header;
