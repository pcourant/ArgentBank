import { FunctionComponent, ComponentType, PropsWithChildren } from 'react';
import cx from 'classnames';

import styles from './Account.module.css';
import Button from '@components/Button';

type AccountProps = PropsWithChildren<{
    as?: keyof JSX.IntrinsicElements | ComponentType<PropsWithChildren>;
    title?: string;
    description?: string;
    amount?: string;
}>;

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
                <Button className={styles.transactionButton}>
                    View transactions
                </Button>
            </div>
        </Tag>
    );
};

export default Account;
