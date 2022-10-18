import { FunctionComponent, PropsWithChildren } from 'react';
import cx from 'classnames';

import styles from './SignInForm.module.css';
import Form from './Form';
import FormField from './Form/FormField';
import PrimaryButton from '../../../../../components/PrimaryButton';

const SignInForm = () => {
    return (
        <section className={styles.signInContent}>
            <i className={cx('fa', 'fa-user-circle', styles.signInIcon)}></i>
            <h1>Sign In</h1>
            <Form>
                <FormField type="text" name="username">
                    Username
                </FormField>
                <FormField type="password" name="password">
                    Password
                </FormField>
                <FormField type="checkbox" name="remember-me">
                    Remember me
                </FormField>
                <PrimaryButton overriddenClass={styles.signInButton}>
                    Sign In
                </PrimaryButton>
            </Form>
        </section>
    );
};

export default SignInForm;
