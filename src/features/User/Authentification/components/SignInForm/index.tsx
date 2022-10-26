import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import cx from 'classnames';

import styles from './SignInForm.module.css';
import Form from './Form';
import FormField from './Form/FormField';

import PrimaryButton from '@components/PrimaryButton';
import { useLogin, submitLogin } from '@features/User/Authentification/';

type SignInProps = {
    toPath?: string;
};
const SignInForm = ({ toPath }: SignInProps) => {
    const navigate = useNavigate();
    const loginMutation = useLogin();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();

        submitLogin(loginMutation, { email, password }, () => {
            if (toPath) navigate(toPath);
        });
    };

    return (
        <section className={styles.signInContent}>
            <i className={cx('fa', 'fa-user-circle', styles.signInIcon)}></i>
            <h1>Sign In</h1>
            <Form onSubmit={handleSubmit}>
                <FormField
                    type="email"
                    name="email"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="johndoe@email.com"
                >
                    Username
                </FormField>
                <FormField
                    type="password"
                    name="password"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Please enter a strong password"
                >
                    Password
                </FormField>
                <FormField type="checkbox" name="remember-me">
                    Remember me
                </FormField>
                <PrimaryButton
                    className={styles.signInButton}
                    htmlType="submit"
                >
                    Sign In
                </PrimaryButton>
            </Form>
        </section>
    );
};

export default SignInForm;
