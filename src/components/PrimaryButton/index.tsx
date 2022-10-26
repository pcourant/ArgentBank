import React, {
    ButtonHTMLAttributes,
    MouseEventHandler,
    FunctionComponent,
    PropsWithChildren,
} from 'react';
import cx from 'classnames';

import styles from './PrimaryButton.module.css';

type PrimaryButtonProps = PropsWithChildren<{
    className?: string;
    htmlType?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
    onClick?: MouseEventHandler<HTMLButtonElement>;
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
