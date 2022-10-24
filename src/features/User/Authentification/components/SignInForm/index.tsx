import { useState } from 'react';
import cx from 'classnames';

import styles from './SignInForm.module.css';
import Form from './Form';
import FormField from './Form/FormField';
// import PrimaryButton from '../../../../../components/PrimaryButton';
import { useUserContext } from '../../../../../context';

interface CredentialsInterface {
    email: string;
    password: string;
}

interface DataInterface {
    body: TokenInterface;
    message: string;
    status: number;
}

interface TokenInterface {
    token: string;
}

async function loginUser(
    credentials: CredentialsInterface,
): Promise<DataInterface> {
    // console.log('credentials', JSON.stringify(credentials));
    return fetch('http://localhost:3001/api/v1/user/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
    }).then((data) => data.json() as Promise<DataInterface>);
}

const SignInForm = () => {
    const { user, setUser } = useUserContext();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e: React.SyntheticEvent) => {
        console.log(email);
        console.log(password);

        e.preventDefault();
        const { body }: DataInterface = await loginUser({
            email,
            password,
        });
        setUser({ ...user, token: body.token });
    };

    return (
        <section className={styles.signInContent}>
            <i className={cx('fa', 'fa-user-circle', styles.signInIcon)}></i>
            <h1>Sign In</h1>
            {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
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
                {/* <PrimaryButton className={styles.signInButton}>
                    Sign In
                </PrimaryButton> */}
                <button
                    type="submit"
                    className={cx(styles.default, styles.signInButton)}
                >
                    Sign In
                </button>
            </Form>
        </section>
    );
};

export default SignInForm;
