import React from 'react';
import styles from './SignIn.module.css';

import cx from 'classnames';

const SignIn = () => {
    return (
        <main className={'main bg-dark'}>
            <section className={styles.signInContent}>
                <i
                    className={cx('fa', 'fa-user-circle', styles.signInIcon)}
                ></i>
                <h1>Sign In</h1>
                <form>
                    <div className={styles.inputWrapper}>
                        <label htmlFor="username">Username</label>
                        <input type="text" id="username" />
                    </div>
                    <div className={styles.inputWrapper}>
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" />
                    </div>
                    <div className={styles.inputRemember}>
                        <input type="checkbox" id="remember-me" />
                        <label htmlFor="remember-me">Remember me</label>
                    </div>
                    {/* // PLACEHOLDER DUE TO STATIC SITE
                    <a href="./user.html" className={styles.signInButton}>
                        Sign In
                    </a>
                    // SHOULD BE THE BUTTON BELOW */}
                    <button className={styles.signInButton}>Sign In</button>
                </form>
            </section>
        </main>
    );
};

export default SignIn;
