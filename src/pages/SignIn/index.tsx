import { SignInForm } from '@features/User/Authentification';

const SignIn = () => {
  return (
    <main className={'main bg-dark'}>
      <SignInForm toPath={'/user'} />
    </main>
  );
};

export default SignIn;
