import { FunctionComponent, PropsWithChildren } from 'react';
import styles from './FeatureItem.module.css';

type Props = PropsWithChildren<{
    icon?: string;
    alt?: string;
    title?: string;
}>;

const FeatureItem: FunctionComponent<Props> = ({
    icon = '',
    alt = '',
    title = '',
    children,
}) => {
    return (
        <div className={styles.featureItem}>
            <img src={icon} alt={alt} className={styles.featureIcon} />
            <h3 className={styles.featureItemTitle}>{title}</h3>
            <p>{children}</p>
        </div>
    );
};

export default FeatureItem;
