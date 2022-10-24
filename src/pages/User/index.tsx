import { ProfileHeader } from '@features/User';
import { Account } from '@features/User';
import { useUsersQuery } from '../../services/userAPI';
import { useUserContext } from '../../context';

const User = () => {
    // const { data, error, isLoading, isSuccess } = useUsersQuery('');
    const { data } = useUsersQuery('');
    console.log(data);

    const { user } = useUserContext();
    console.log(user);

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
