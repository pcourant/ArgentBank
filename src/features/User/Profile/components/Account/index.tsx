import { FunctionComponent, PropsWithChildren } from 'react';
import cx from 'classnames';

import styles from './Account.module.css';
import PrimaryButton from 'src/components/PrimaryButton';

type AccountProps = PropsWithChildren<{
    title?: string;
    description?: string;
    amount?: string;
}>;

const Account: FunctionComponent<AccountProps> = ({
    title = '',
    description = '',
    amount = '',
}) => {
    return (
        <section className={styles.account}>
            <div className={styles.accountContentWrapper}>
                <h3 className={styles.accountTitle}>{title}</h3>
                <p className={styles.accountAmount}>{amount}</p>
                <p className={styles.accountAmountDescription}>{description}</p>
            </div>
            <div className={cx(styles.accountContentWrapper, styles.cta)}>
                <PrimaryButton overriddenClass={styles.transactionButton}>
                    View transactions
                </PrimaryButton>
            </div>
        </section>
    );
};

export default Account;
