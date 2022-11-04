import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Else, If, Then } from 'react-if';
import cx from 'classnames';

import styles from './SignInForm.module.css';
import Form from './Form';
import FormField from './Form/FormField';

import Button from '@components/Button';
import { useLogin, submitLogin } from '@features/User/Authentification/';
import { useAppDispatch } from '@utils/redux/hooks';
import * as userActions from '@features/User';

type SignInProps = {
  toPath?: string;
};
const SignInForm = ({ toPath }: SignInProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const loginMutation = useLogin();

  const { isLoading, isError, error } = loginMutation;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    submitLogin(
      loginMutation,
      { email, password },
      (data) => {
        dispatch(userActions.signIn(data.data.body.token));
        if (toPath) navigate(toPath);
      },
      () => null,
    );
  };

  return (
    <>
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
          <Button htmlType="submit">Sign In</Button>
          <If condition={isLoading}>
            <Then>
              <div className={styles.loaderContainer}>
                <div className={styles.loader}></div>
                <p>Signing in ...</p>
              </div>
            </Then>
          </If>
          <If condition={isError}>
            <Then>
              <div className={styles.errorContainer}>
                <If condition={error?.response != null}>
                  <Then>
                    <p>{error?.response?.data?.message}</p>
                    <p>
                      {'Status code : '}
                      {error?.response?.data?.status}
                    </p>
                  </Then>
                  <Else>
                    <p>{error?.message}</p>
                  </Else>
                </If>
              </div>
            </Then>
          </If>
        </Form>
      </section>
    </>
  );
};

export default SignInForm;
