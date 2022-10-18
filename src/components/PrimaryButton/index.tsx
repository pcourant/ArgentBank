import { FunctionComponent, PropsWithChildren } from 'react';
import cx from 'classnames';

import styles from './PrimaryButton.module.css';

type PrimaryButtonProps = PropsWithChildren<{ overriddenClass?: string }>;

const PrimaryButton: FunctionComponent<PrimaryButtonProps> = ({
    overriddenClass,
    children,
}) => {
    return (
        <button className={cx(styles.primaryButton, overriddenClass)}>
            {children}
        </button>
    );
};

export default PrimaryButton;
