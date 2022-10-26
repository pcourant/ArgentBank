import { FunctionComponent, PropsWithChildren } from 'react';
import cx from 'classnames';

import styles from './PrimaryButton.module.css';

type PrimaryButtonProps = PropsWithChildren<{
    className?: string;
    htmlType?: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}>;

const PrimaryButton: FunctionComponent<PrimaryButtonProps> = ({
    className,
    htmlType,
    onClick,
    children,
}) => {
    return (
        <button
            className={cx(styles.default, className)}
            type={htmlType}
            onClick={onClick}
        >
            {children}
        </button>
    );
};

export default PrimaryButton;
