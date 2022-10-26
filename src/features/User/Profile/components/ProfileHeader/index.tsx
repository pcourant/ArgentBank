import { FunctionComponent, useState, ChangeEvent, FormEvent } from 'react';
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
            ) : (
                <Button size="small" onClick={handleClick}>
                    Edit Name
                </Button>
            )}
        </div>
    );
};

export default ProfileHeader;
