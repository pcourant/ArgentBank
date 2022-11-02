import { SignInForm } from '@features/User/Authentification';

const SignIn = () => {
  return (
    <main className={'main bg-dark'}>
      <SignInForm toPath={'/profile'} />
    </main>
  );
};

export default SignIn;
