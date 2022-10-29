import { Link } from 'react-router-dom';
import client from '@utils/config/axios';

import styles from './Header.module.css';
import Logo from '@assets/images/argentBankLogo.png';

import { useAppDispatch, useAppSelector } from '@utils/redux/hooks';
import { selectUser } from '@utils/redux/selectors';
import { resetUser } from '@features/User';

const Header = () => {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  const handleSignOut = () => {
    dispatch(resetUser());
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
