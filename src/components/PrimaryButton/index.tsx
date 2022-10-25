import { FunctionComponent, PropsWithChildren } from 'react';
import cx from 'classnames';

import styles from './PrimaryButton.module.css';

type PrimaryButtonProps = PropsWithChildren<{
    className?: string;
    htmlType?: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
}>;

const PrimaryButton: FunctionComponent<PrimaryButtonProps> = ({
    className,
    htmlType,
    children,
}) => {
    return (
        <button className={cx(styles.default, className)} type={htmlType}>
            {children}
        </button>
    );
};

export default PrimaryButton;
