import { Link } from 'react-router-dom';

import styles from './Header.module.css';
import Logo from '@assets/images/argentBankLogo.png';

import { useAppDispatch, useAppSelector } from '@utils/redux/hooks';
import { selectUser } from '@utils/redux/selectors';
import { signOutUser } from '@features/User';

const Header = () => {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  const handleSignOut = () => {
    dispatch(signOutUser());
  };

  return (
    <nav className={styles.mainNav}>
      <Link className={styles.mainNavLogo} to={''}>
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
          to={user.isAuthenticated ? 'profile' : 'login'}
        >
          <i className="fa fa-user-circle"></i>
          {user.isAuthenticated ? user.firstName : 'Sign In'}
        </Link>
        {user.isAuthenticated ? (
          <Link className={styles.mainNavItem} to="" onClick={handleSignOut}>
            <i className="fa fa-sign-out"></i>
            Sign Out
          </Link>
        ) : null}
      </div>
    </nav>
  );
};

export default Header;
