import React, {
  ButtonHTMLAttributes,
  MouseEventHandler,
  FunctionComponent,
  PropsWithChildren,
} from 'react';
import cx from 'classnames';

import styles from './Button.module.css';

type PrimaryButtonProps = PropsWithChildren<{
  type?: 'primary' | 'secondary';
  size?: 'big' | 'small';
  className?: string;
  htmlType?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
  onClick?: MouseEventHandler<HTMLButtonElement>;
}>;

const Button: FunctionComponent<PrimaryButtonProps> = ({
  type = 'primary',
  size = 'big',
  className,
  htmlType,
  onClick,
  children,
}) => {
  return (
    <button
      className={cx(
        styles.default,
        size === 'big' ? styles.big : styles.small,
        type === 'primary' ? styles.primary : styles.secondary,
        className,
      )}
      type={htmlType}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
