import styles from './ProfileHeader.module.css';
import PrimaryButton from '@components/PrimaryButton';

const Header = () => {
    return (
        <div className={styles.header}>
            <h1>
                Welcome back
                <br />
                Tony Jarvis!
            </h1>
            <PrimaryButton className={styles.editButton}>
                Edit Name
            </PrimaryButton>
        </div>
    );
};

export default Header;
