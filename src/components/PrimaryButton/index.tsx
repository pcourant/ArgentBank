import { FunctionComponent, PropsWithChildren } from 'react';
import cx from 'classnames';

import styles from './PrimaryButton.module.css';

type PrimaryButtonProps = PropsWithChildren<{ className?: string }>;

const PrimaryButton: FunctionComponent<PrimaryButtonProps> = ({
    className,
    children,
}) => {
    return (
        <button className={cx(styles.default, className)}>{children}</button>
    );
};

export default PrimaryButton;
