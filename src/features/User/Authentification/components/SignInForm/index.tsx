import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import cx from 'classnames';

import styles from './SignInForm.module.css';
import Form from './Form';
import FormField from './Form/FormField';
// import PrimaryButton from '../../../../../components/PrimaryButton';
import { useUserContext } from '../../../../../utils/context';
import { useLogin, submitLogin } from '@features/User/services/api';

// interface DataInterface {
//     body: TokenInterface;
//     message: string;
//     status: number;
// }

// interface TokenInterface {
//     token: string;
// }

// async function loginUser(
//     credentials: CredentialsInterface,
// ): Promise<DataInterface> {
//     // console.log('credentials', JSON.stringify(credentials));
//     return fetch('http://localhost:3001/api/v1/user/login', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(credentials),
//     }).then((data) => data.json() as Promise<DataInterface>);
// }

const SignInForm = ({ to }) => {
    const navigate = useNavigate();
    const userContext = useUserContext();
    const loginMutation = useLogin();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();

        submitLogin(
            loginMutation,
            { email, password },
            userContext,
            navigate,
            to,
        );
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
