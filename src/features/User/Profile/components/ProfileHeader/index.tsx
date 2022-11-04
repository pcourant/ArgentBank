import { useState, ChangeEvent, FormEvent, SyntheticEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Else, If, Then } from 'react-if';
import type { AxiosError } from 'axios';
import { Skeleton } from '@mui/material';
import type { ErrorResponseData } from '@utils/types';

import styles from './ProfileHeader.module.css';
import Button from '@components/Button';

import { useAppDispatch, useAppSelector } from '@utils/redux/hooks';
import { selectUser } from '@utils/redux/selectors';
import * as userActions from '@features/User';
import {
  useProfileUpdate,
  submitProfileUpdate,
  useProfile,
} from '@features/User/Profile';

const ProfileHeader = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState({ firstName: '', lastName: '' });
  const navigate = useNavigate();

  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  const profile = useProfile(
    (data) => {
      dispatch(
        userActions.setName({
          firstName: data.body.firstName,
          lastName: data.body.lastName,
        }),
      );
    },
    (err) => {
      if (err.response?.data.status === 401) {
        console.error(
          'Redirection to SignIn Page because',
          err.response?.data.message,
        );
        dispatch(userActions.signOut());
        navigate('/login');
      }
    },
  );

  const profileMutation = useProfileUpdate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputName = e.currentTarget.name;
    const inputValue = e.currentTarget.value;
    setName((name) => ({
      ...name,
      [inputName]: inputValue,
    }));
  };

  const handleClick = (e: SyntheticEvent) => {
    e.preventDefault();
    setIsEditing((isEditing) => !isEditing);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    submitProfileUpdate(
      profileMutation,
      name,
      (data, name) => {
        dispatch(
          userActions.setName({
            firstName: name.firstName,
            lastName: name.lastName,
          }),
        );
        setIsEditing((isEditing) => !isEditing);
      },
      (err: AxiosError<ErrorResponseData>) => {
        if (err.response?.data.status === 401) {
          console.error(
            'Redirection to SignIn Page because',
            err.response?.data.message,
          );
          dispatch(userActions.signOut());
          navigate('/login');
        }
      },
    );
  };

  return (
    <div className={styles.container}>
      <h1>
        Welcome back
        <br />
        <If
          condition={
            !isEditing &&
            !profile.isLoading &&
            !profile.isError &&
            !profileMutation.isLoading &&
            !profileMutation.isError &&
            user.firstName &&
            user.lastName
          }
        >
          <Then>
            <span>
              {user.firstName} {user.lastName}!
            </span>
          </Then>
        </If>
      </h1>
      <If
        condition={
          !isEditing &&
          !profile.isLoading &&
          !profile.isError &&
          !profileMutation.isLoading &&
          !profileMutation.isError &&
          user.firstName &&
          user.lastName
        }
      >
        <Then>
          <Button size="small" onClick={handleClick}>
            Edit Name
          </Button>
        </Then>
      </If>
      <If condition={!isEditing}>
        <Then>
          <If condition={profile.isError}>
            <Then>
              <div className={styles.errorContainer}>
                <If condition={profile.error?.response != null}>
                  <Then>
                    <p>{profile.error?.response?.data?.message}</p>
                    <p>Status code : {profile.error?.response?.data?.status}</p>
                  </Then>
                  <Else>
                    <p>{profile.error?.message}</p>
                  </Else>
                </If>
              </div>
            </Then>
          </If>
          <Else>
            <If
              condition={
                (!profile.isError && !user.firstName && !user.lastName) ||
                profile.isLoading
              }
            >
              <Then>
                <Skeleton
                  variant="rectangular"
                  width={150}
                  height={32}
                  sx={{
                    bgcolor: '#2c3e50',
                    display: 'inline-block',
                    marginRight: '16px',
                  }}
                />
                <Skeleton
                  variant="rectangular"
                  width={150}
                  height={32}
                  sx={{
                    bgcolor: '#2c3e50',
                    display: 'inline-block',
                  }}
                />
              </Then>
            </If>
          </Else>
        </Then>
      </If>

      <If condition={isEditing}>
        <Then>
          <If condition={profileMutation.isIdle || profileMutation.isSuccess}>
            <Then>
              <form onSubmit={handleSubmit}>
                <input
                  className={styles.input}
                  type="text"
                  id="firstName"
                  name="firstName"
                  required
                  placeholder={user.firstName}
                  autoComplete="given-name"
                  onChange={handleChange}
                ></input>
                <input
                  className={styles.input}
                  type="text"
                  id="lastName"
                  name="lastName"
                  required
                  placeholder={user.lastName}
                  autoComplete="family-name"
                  onChange={handleChange}
                ></input>
                <div className={styles.buttonsContainer}>
                  <Button
                    size="small"
                    type="secondary"
                    className={styles.editButton}
                    htmlType="submit"
                  >
                    Save
                  </Button>
                  <Button
                    size="small"
                    type="secondary"
                    className={styles.editButton}
                    onClick={handleClick}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </Then>
            <Else>
              <If
                condition={
                  profileMutation.isLoading && !profileMutation.isError
                }
              >
                <Then>
                  <Skeleton
                    variant="rectangular"
                    width={150}
                    height={32}
                    sx={{
                      bgcolor: '#2c3e50',
                      display: 'inline-block',
                      marginRight: '16px',
                    }}
                  />
                  <Skeleton
                    variant="rectangular"
                    width={150}
                    height={32}
                    sx={{
                      bgcolor: '#2c3e50',
                      display: 'inline-block',
                    }}
                  />
                </Then>
              </If>
              <If condition={profileMutation.isError}>
                <Then>
                  <div className={styles.errorContainer}>
                    <If condition={profileMutation.error?.response != null}>
                      <Then>
                        <p>{profileMutation.error?.response?.data?.message}</p>
                        <p>
                          {'Status code : '}
                          {profileMutation.error?.response?.data?.status}
                        </p>
                      </Then>
                      <Else>
                        <p>{profileMutation.error?.message}</p>
                      </Else>
                    </If>
                  </div>
                </Then>
              </If>
            </Else>
          </If>
        </Then>
      </If>
    </div>
  );
};

export default ProfileHeader;
