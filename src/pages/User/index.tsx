import { ProfileHeader, Account, useProfile } from '@features/User/Profile';
import { useUserContext } from '@utils/context';

const User = () => {
    const userContext = useUserContext();
    // const { status, data, error, isFetching } = useProfile(userContext);
    useProfile((data) => {
        console.log('API: useProfile', data);
        userContext.setUser({
            ...userContext.user,
            id: data.body.id,
            email: data.body.email,
            firstName: data.body.firstName,
            lastName: data.body.lastName,
        });
    });

    return (
        <main className="main bg-dark">
            <ProfileHeader
                firstName={userContext.user.firstName}
                lastName={userContext.user.lastName}
            />
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
