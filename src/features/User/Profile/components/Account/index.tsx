import { ElementType, HTMLAttributes, FunctionComponent } from 'react';
import cx from 'classnames';

import styles from './Account.module.css';
import PrimaryButton from '@components/PrimaryButton';

interface AccountProps extends HTMLAttributes<HTMLOrSVGElement> {
    as?: ElementType;
    title?: string;
    description?: string;
    amount?: string;
    children?: React.ReactNode;
}

const Account: FunctionComponent<AccountProps> = ({
    as: Tag = 'div',
    title = '',
    description = '',
    amount = '',
}) => {
    return (
        <Tag className={styles.account}>
            <div className={styles.accountContentWrapper}>
                <h3 className={styles.accountTitle}>{title}</h3>
                <p className={styles.accountAmount}>{amount}</p>
                <p className={styles.accountAmountDescription}>{description}</p>
            </div>
            <div className={cx(styles.accountContentWrapper, styles.cta)}>
                <PrimaryButton className={styles.transactionButton}>
                    View transactions
                </PrimaryButton>
            </div>
        </Tag>
    );
};

export default Account;
