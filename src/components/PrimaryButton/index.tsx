import { FunctionComponent, PropsWithChildren } from 'react';
import styles from './PrimaryButton.module.css';

type PrimaryButtonProps = PropsWithChildren<{ className?: string }>;

const PrimaryButton: FunctionComponent<PrimaryButtonProps> = ({ children }) => {
    return <button className={styles.signInButton}>{children}</button>;
};

export default PrimaryButton;
