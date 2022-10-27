import { useState, ChangeEvent, FormEvent } from 'react';
import { Else, If, Then } from 'react-if';
import { AxiosError } from 'axios';
import {
  useProfileUpdate,
  submitProfileUpdate,
  useProfile,
} from '@features/User/Profile';
import { useUserContext } from '@utils/context';

import styles from './ProfileHeader.module.css';
import Button from '@components/Button';
import { Skeleton } from '@mui/material';

const ProfileHeader = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState({ firstName: '', lastName: '' });
  const userContext = useUserContext();
  console.log(userContext);

  const profile = useProfile((data) => {
    console.log('API: useProfile', data);
    userContext.setUser({
      ...userContext.user,
      id: data.body.id,
      email: data.body.email,
      firstName: data.body.firstName,
      lastName: data.body.lastName,
    });
  });
  // console.log(profile);

  const errorProfile = profile.error as AxiosError<ErrorResponseData>; // Type assertion

  const profileMutation = useProfileUpdate();
  const errorUpdateProfile =
    profileMutation.error as AxiosError<ErrorResponseData>; // Type assertion

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputName = e.currentTarget.name;
    const inputValue = e.currentTarget.value;
    setName((name) => ({
      ...name,
      [inputName]: inputValue,
    }));
  };

  const handleClick = () => {
    setIsEditing((isEditing) => !isEditing);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    submitProfileUpdate(profileMutation, name, (data, name) => {
      console.log('API: submitProfileUpdate', data);
      userContext.setUser({
        ...userContext.user,
        firstName: name.firstName,
        lastName: name.lastName,
        email: data.data.body.email,
        id: data.data.body.id,
      });
      setIsEditing((isEditing) => !isEditing);
    });
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
            userContext.user.firstName &&
            userContext.user.lastName
          }
        >
          <Then>
            <span>
              {userContext.user.firstName} {userContext.user.lastName}!
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
          userContext.user.firstName &&
          userContext.user.lastName
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
          <If
            condition={
              (!userContext.user.firstName && !userContext.user.lastName) ||
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
            <Else>
              <If condition={profile.isError}>
                <Then>
                  <div className={styles.errorContainer}>
                    <If condition={errorProfile?.response != null}>
                      <Then>
                        <p>{errorProfile?.response?.data?.message}</p>
                        <p>
                          Status code : {errorProfile?.response?.data?.status}
                        </p>
                      </Then>
                      <Else>
                        <p>{errorProfile?.message}</p>
                      </Else>
                    </If>
                  </div>
                </Then>
              </If>
            </Else>
          </If>
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
                  placeholder={userContext.user.firstName}
                  onChange={handleChange}
                ></input>
                <input
                  className={styles.input}
                  type="text"
                  id="lastName"
                  name="lastName"
                  required
                  placeholder={userContext.user.lastName}
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
                  (!userContext.user.firstName && !userContext.user.lastName) ||
                  profileMutation.isLoading
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
                    <If condition={errorUpdateProfile?.response != null}>
                      <Then>
                        <p>{errorUpdateProfile?.response?.data?.message}</p>
                        <p>
                          {'Status code : '}
                          {errorUpdateProfile?.response?.data?.status}
                        </p>
                      </Then>
                      <Else>
                        <p>{errorUpdateProfile?.message}</p>
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
