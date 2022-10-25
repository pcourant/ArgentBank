import { ProfileHeader } from '@features/User';
import { Account } from '@features/User';
import { useProfile } from '@features/User/services/api';
import { useUserContext } from '../../utils/context';

const User = () => {
    const userContext = useUserContext();
    console.log('USER PAGE', userContext.user);

    const { status, data, error, isFetching } = useProfile(userContext);
    console.log('USER PAGE', userContext.user);

    return (
        <main className="main bg-dark">
            <ProfileHeader />
            <h2 className="sr-only">Accounts</h2>
            <Account
                as="section"
                title="Argent Bank Checking (x8349)"
                description="Available Balance"
                amount="$2,082.79"
            />
            <Account
                as="section"
                title="Argent Bank Savings (x6712)"
                description="Available Balance"
                amount="$10,928.42"
            />
            <Account
                as="section"
                title="Argent Bank Credit Card (x8349)"
                description="Current Balance"
                amount="$184.30"
            />
        </main>
    );
};

export default User;
