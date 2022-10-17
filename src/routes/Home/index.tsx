import React from 'react';
import styles from './Home.module.css';

import IconChat from '../../assets/icon-chat.png';
import IconMoney from '../../assets/icon-money.png';
import IconSecurity from '../../assets/icon-security.png';
import FeatureItem from './components/FeatureItem';

const features = [
    {
        icon: IconChat,
        alt: 'Chat Icon',
        title: 'You are our #1 priority',
        text: 'Need to talk to a representative? You can get in touch through our 24/7 chat or through a phone call in less than 5minutes.',
    },
    {
        icon: IconMoney,
        alt: 'Money Icon',
        title: 'More savings means higher rates',
        text: 'The more you save with us, the higher your interest rate will be!',
    },
    {
        icon: IconSecurity,
        alt: 'Security Icon',
        title: 'Security you can trust',
        text: 'We use top of the line encryption to make sure your data and money is always safe.',
    },
];

const Home = () => {
    return (
        <main>
            <div className={styles.hero}>
                <section className={styles.heroContent}>
                    <h2 className="sr-only">Promoted Content</h2>
                    <p className={styles.subtitle}>No fees.</p>
                    <p className={styles.subtitle}>No minimum deposit.</p>
                    <p className={styles.subtitle}>High interest rates.</p>
                    <p className={styles.text}>
                        Open a savings account with Argent Bank today!
                    </p>
                </section>
            </div>
            <section className={styles.features}>
                <h2 className="sr-only">Features</h2>
                {features.map((feature, index) => (
                    <FeatureItem
                        key={`${index}-${feature.alt}`}
                        icon={feature.icon}
                        alt={feature.alt}
                        title={feature.title}
                    >
                        {feature.text}
                    </FeatureItem>
                ))}
            </section>
        </main>
    );
};

export default Home;
