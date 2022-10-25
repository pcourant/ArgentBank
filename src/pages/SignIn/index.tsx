import { SignInForm } from '@features/User/Authentification';

const SignIn = () => {
    return (
        <main className={'main bg-dark'}>
            <SignInForm to={'/user'} />
        </main>
    );
};

export default SignIn;
