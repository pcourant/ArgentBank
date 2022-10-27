import { FunctionComponent, useState, ChangeEvent, FormEvent } from 'react';
import { Else, If, Then } from 'react-if';
import { AxiosError } from 'axios';
import { useProfileUpdate, submitProfileUpdate } from '@features/User/Profile';
import { useUserContext } from '@utils/context';

import styles from './ProfileHeader.module.css';
import Button from '@components/Button';

type ProfileHeaderProps = {
    firstName?: string;
    lastName?: string;
};
const ProfileHeader: FunctionComponent<ProfileHeaderProps> = ({
    firstName = '',
    lastName = '',
}) => {
    const userContext = useUserContext();
    const profileMutation = useProfileUpdate();

    const { isLoading, isIdle, isSuccess, isError } = profileMutation;
    const error = profileMutation.error as AxiosError<ErrorResponseData>; // Type assertion

    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState({ firstName: '', lastName: '' });

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
                {isEditing ? null : `${firstName} ${lastName}!`}
            </h1>
            {isEditing ? (
                <If condition={isIdle || isSuccess}>
                    <Then>
                        <form onSubmit={handleSubmit}>
                            <input
                                className={styles.input}
                                type="text"
                                id="firstName"
                                name="firstName"
                                required
                                placeholder={firstName}
                                onChange={handleChange}
                            ></input>
                            <input
                                className={styles.input}
                                type="text"
                                id="lastName"
                                name="lastName"
                                required
                                placeholder={lastName}
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
                        <If condition={isLoading}>
                            <Then>
                                <div className={styles.loaderContainer}>
                                    <div className={styles.loader}></div>
                                    <p>Updating profile name ...</p>
                                </div>
                            </Then>
                        </If>
                        <If condition={isError}>
                            <Then>
                                <div className={styles.errorContainer}>
                                    <If condition={error?.response != null}>
                                        <Then>
                                            <p>
                                                {error?.response?.data?.message}
                                            </p>
                                            <p>
                                                Status code :{' '}
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
                    </Else>
                </If>
            ) : (
                <Button size="small" onClick={handleClick}>
                    Edit Name
                </Button>
            )}
        </div>
    );
};

export default ProfileHeader;
